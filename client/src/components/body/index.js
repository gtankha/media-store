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

    const { currentCategory,currentSearch } = state;

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
        console.log("current category",currentCategory)

        let products = state.products;



     

        

        if(currentCategory) products = products.filter(product => product.category._id === currentCategory);
        if(currentSearch) products = products.filter(product => product.name.toLowerCase().includes(currentSearch.toLowerCase()));

        return products
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

    return (

      <Wrapper>

        <Container>
            {filterProducts().map(product => (
                <Product _id={product._id} image={product.image} title={product.name} price={product.price} key={product._id} bidValue={product.bidValue}
                    description={product.description} bidderName={product.bidderName} bidTimeStamp={product.bidTimeStamp} cart="no"
                />
            ))}
        </Container>

        </Wrapper>
    )
}

export default Body;