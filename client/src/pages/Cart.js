import styled, { css } from 'styled-components'
import Product from '../components/product'
import { QUERY_PRODUCTS } from "../utils/queries";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_PRODUCTS } from '../utils/actions';
import { useQuery } from '@apollo/react-hooks';
import { idbPromise } from "../utils/helpers";
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/react-hooks';
import { QUERY_CHECKOUT } from '../utils/queries';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../utils/actions";
import Auth from "../utils/auth";



function Cart() {

    const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
    // get cart and cartOpen info from state
    //const cartI = state => state.cart;
    //const cart = useSelector(cartI);
    // const stateCartI = state => state.cartOpen;
    // const cartOpen = useSelector(stateCartI);
    const state = useSelector((state) => {
        return state
    });
    const dispatch = useDispatch();

    const { cart } = state;
    console.log("cart", cart)
    cart.forEach(product => {

        idbPromise('cart', 'put', product);
    });

    // dispatch using redux
  
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
    useEffect(() => {
        if (data) {
            console.log(data);
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


    // function toggleCart() {
    //     dispatch({ type: TOGGLE_CART });
    // }
    // if (!cartOpen) {
    //     return (
    //         <div className="cart-closed" onClick={toggleCart}>
    //             <span
    //                 role="img"
    //                 aria-label="trash">🛒</span>
    //         </div>
    //     );
    // }
    function calculateTotal() {
        let sum = 0;
        console.log ("cart2: "+ cart);
        cart.forEach(item => {
            console.log(item);
          //  sum += item.price * item.purchaseQuantity;
          sum += item.price ;
           
        });
        console.log(sum);
        return sum.toFixed(2);
    }
    function submitCheckout() {
        console.log ("I AM CHECKIUT");
        const productIds = [];

        cart.forEach((item) => {
            console.log ("itemm");
            console.log (item);
           // for (let i = 0; i < item.purchaseQuantity; i++) {
                productIds.push(item._id);
                console.log("check it out");
                console.log(productIds);
           // }
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

                       // <button onClick={submitCheckout}>
                            <CheckOutBtn onClick={submitCheckout}>
                                    Checkout
                                    </CheckOutBtn>
                        //    </button>
                            :
                            <span>(log in to check out)</span>
                    }
                </div>

            </Container>

        </Wrapper>
    )
}

export default Cart;