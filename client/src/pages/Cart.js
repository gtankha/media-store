import styled, { css } from 'styled-components'
import Product from '../components/product'
import { QUERY_PRODUCTS } from "../utils/queries";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_PRODUCTS } from '../utils/actions';
import { useQuery } from '@apollo/react-hooks';
import { idbPromise } from "../utils/helpers";

function Cart() {

    const state = useSelector((state) => {
        return state
    });
    const dispatch = useDispatch();

    const { cart } = state;
      console.log("cart",cart)
    cart.forEach(product => {
   
            //idbPromise('cart', 'put', product);
    });
       

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
            {cart.map((product,i) => (
                <Product _id={product._id} image={product.image} title={product.name} price={product.price} key={product._id+i}
                    description={product.description} cart="yes"
                />
            ))}

<CheckOutBtn>Checkout</CheckOutBtn>
            
        </Container>
        
        </Wrapper>
    )
}

export default Cart;