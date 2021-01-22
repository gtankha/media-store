import { useReducer } from 'react';

import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    UPDATE_CURRENT_SEARCH,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    
} from './actions';


const initial = {
    products: [],
    cart: [],
    categories: [],
    currentCategory: '',
    currentSearch:''
  };


export const reducer = (state=initial, action) => {
    console.log("action",action)
    switch (action.type) {
        // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: [...action.products]
            };
        // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            };

        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            };
        case UPDATE_CURRENT_SEARCH:
                return {
                    ...state,
                    currentSearch: action.currentSearch
                };
        case ADD_TO_CART:
            return {
                ...state,
   
                cart: [...state.cart, action.product]
            };
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.products],
            };
        case REMOVE_FROM_CART:
            let newState = state.cart.filter(product => {
                console.log("action id",action._id)
                return product._id !== action._id;
            });
            console.log("newState",newState)
            return {
                ...state,
                cart: newState
            };
        case UPDATE_CART_QUANTITY:
            return {
                ...state,
           
                cart: state.cart.map(product => {
                    if (action._id === product._id) {
                        product.purchaseQuantity = action.purchaseQuantity;
                    }
                    return product;
                })
            };

        case CLEAR_CART:
            return {
                ...state,

                cart: []
            };



        default:
            return state;
    }
};

export default reducer;



