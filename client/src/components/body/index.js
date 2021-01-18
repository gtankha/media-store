import styled, { css } from 'styled-components'
import Product from '../product'
import { QUERY_PRODUCTS } from "../../utils/queries";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/react-hooks';
import { idbPromise } from "../../utils/helpers";

function Body() {

    const state = useSelector((state) => {
        return state
    });
    const dispatch = useDispatch();

    const { currentCategory } = state;

    const { loading, data } = useQuery(QUERY_PRODUCTS);


    useEffect(() => {
        if(data) {
          dispatch({
            type: UPDATE_PRODUCTS,
            products: data.products
          });
      
          data.products.forEach((product) => {
            idbPromise('products', 'put', product);
          });
          // add else if to check if `loading` is undefined in `useQuery()` Hook
        } else if (!loading) {
          // since we're offline, get all of the data from the `products` store
          idbPromise('products', 'get').then((products) => {
            // use retrieved data to set global state for offline browsing
            dispatch({
              type: UPDATE_PRODUCTS,
              products: products
            });
          });
        }
      }, [data, loading, dispatch]);


    function filterProducts() {
        console.log("state",state)
        if (!currentCategory) {
            return state.products;
        }

        return state.products.filter(product => product.category._id === currentCategory);
    }

    const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    margin-top:50px;
    `;

    return (

        <Container>
            {filterProducts().map(product => (
                <Product image={product.image} title={product.name} price={product.price} key={product._id}
                    description={product.description}
                />
            ))}
        </Container>
    )
}

export default Body;