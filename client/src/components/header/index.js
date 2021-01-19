import styled, { css } from 'styled-components'
import { Link, NavLink, Route} from "react-router-dom";
import Nav from '../Nav'
import { UPDATE_CATEGORIES,UPDATE_CURRENT_CATEGORY,UPDATE_CURRENT_SEARCH } from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { idbPromise } from "../../utils/helpers";

function Header () {


    const H1 = styled.h1 `
    margin-left: 30px;
    `;
    const Input = styled.input`
    width: 55%;
    height: 24px;
    font-size:18px;
    border: 0px;
    border-right:0px; 
    border-left:0px; 
    padding:0 10px;
    outline: none;
    `;
    const Container = styled.div`
    padding: 20px;
    display:flex;
    height:30px;
    width:100%;
    align-items:center;
    justify-content:space-between;
    border-bottom: 1px solid #888;
    `;
    const SearchBtn = styled.div`
    padding-top:3px;
    font-size:18px;
    background-color: #FDB515;
    border-left:0px;
    width: 50px;
    border-radius: 0 20px 20px 0;
    cursor:pointer;
    text-align: center;

    `;
    const Select = styled.select`
    width:80px;
    height:26px;
    border:0px;
    margin-left:20px;
    padding-left:5px;
    outline: none;
    `;

    const WrapBar = styled.div`
    border:1px solid #000;
    width: 55%;
    border-radius: 20px 20px;
    display:flex;
    justify-content:space-between;
    `;

    const state = useSelector((state) => {
        return state
    });
    const dispatch = useDispatch();

    const { currentCategory,currentSearch } = state;

    const { loading, data } = useQuery(QUERY_CATEGORIES);

    const SelectCategory = function (event) {

        console.log(event.target.value);
        const _id = event.target.value;

        dispatch({
          type: UPDATE_CURRENT_CATEGORY,
          currentCategory: _id
        });

    }

    const Search = function (event) {

      const mySearch = document.querySelector("#searchInput").value;

      dispatch({
        type: UPDATE_CURRENT_SEARCH,
        currentSearch: mySearch
      });
    }


    useEffect(() => {
        if(data) {
            console.log(data.categories)
          dispatch({
            type: UPDATE_CATEGORIES,
            categories: data.categories
          });
      
          data.categories.forEach((category) => {
            idbPromise('categories', 'put', category);
          });
          // add else if to check if `loading` is undefined in `useQuery()` Hook
        } else if (!loading) {
          // since we're offline, get all of the data from the `products` store
          idbPromise('categories', 'get').then((categories) => {
            // use retrieved data to set global state for offline browsing
            dispatch({
              type: UPDATE_CATEGORIES,
              categories: categories
            });
          });
        }
      }, [data, loading, dispatch]);

    return (
        <Container>
        <NavLink to="/">
        <span role="img" aria-label="shopping bag">🛍️</span>
        Media Store
        </NavLink>
        <WrapBar>
        <Select onChange={SelectCategory} value={ currentCategory }>
        {state.categories.map(category=> ( 
            <option key={category._id} value={category._id}>{category.name}</option>

        ))}
        <option key="all123" value="">All</option>
        </Select>
        <Input id="searchInput"></Input>
        <SearchBtn onClick={Search} className="fa">&#xf002;</SearchBtn>
        </WrapBar>
        <Nav/>
        </Container> 

    );

}

export default Header;