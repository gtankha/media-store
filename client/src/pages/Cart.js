import styled, { css } from 'styled-components'
import Product from '../components/Product'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { idbPromise } from "../utils/helpers";
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/react-hooks';
import { QUERY_CHECKOUT } from '../utils/queries';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../utils/actions";
import Auth from "../utils/auth";


function Cart() {

    const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

    const state = useSelector((state) => {
        return state
    });
    const dispatch = useDispatch();
    const { cart } = state;
    cart.forEach(product => {
        idbPromise('cart', 'put', product);
    });

    // dispatch using redux

    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);
    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        };
        if (!cart.length) {
            getCart();
        }
    }, [cart.length, dispatch]);

    function calculateTotal() {
        let sum = 0;
        cart.forEach(item => {
            sum += item.price;
        });
        return sum.toFixed(2);
    }
    function submitCheckout() {
        const productIds = [];
        cart.forEach((item) => {
            productIds.push(item._id);
        });
        getCheckout({
            variables: { products: productIds }
        });
    }

    const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    margin-top:50px;
    `;

    const Wrapper = styled.div`
    display:flex;
    justify-content: center;
    `;

    const H5 = styled.div`
    margin-bottom:20px;
    `;


    const CheckOutBtn = styled.button`
    font-size:20px;
    color:#fff;
    border-radius: 20px;
    height: 24px;
    margin-top:35px;
    outline:none;
    cursor:pointer;
    width:125px;
    text-align:center;
    background-color: #333;
    border: 2px solid #ccc;
    white-space: nowrap;
    display:flex;
    align-items:center;
    `;

    return (
        <Wrapper>

            <Container>

                <H5>Your Shopping Cart</H5>
                {cart.map((product, i) => (
                    <Product _id={product._id} image={product.image} title={product.name} price={product.price} key={product._id + i}
                        description={product.description} cart="yes"
                    />
                ))}

                <div className="flex-row space-between">
                    <strong>Total: ${calculateTotal()}</strong>
                    {
                        Auth.loggedIn() ?
                            <CheckOutBtn onClick={submitCheckout}>
                                Checkout
                                    </CheckOutBtn>
                            :
                            <span>(log in to check out)</span>
                    }
                </div>
            </Container>
        </Wrapper>
    )
}

export default Cart;