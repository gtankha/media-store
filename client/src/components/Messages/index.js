import React,{useEffect} from "react";
import Auth from "../../utils/auth";
import { Link, NavLink, Route} from "react-router-dom";
import styled, { css } from 'styled-components'
import { useDispatch,useSelector } from 'react-redux';

// Message functionality to communicate an auction win

const Messages = function()
{

    const state = useSelector((state) => {
        return state
    });
    
    const { messages } = state;

    const UL = styled.ul `
    list-style-type: none;

  `;
  
    const Li = styled.li `
    width:100%;
    border-bottom:1px solid black;
    `;
  
    const SPAN = styled.ul`
    color:#333;
    `;
  
    const Message = styled.div`
    background-color:#fff;
    position:absolute;
    width:100%;
    `;
  





    return (

        <Message><UL>
        {messages.map((message,index) => (
            <Li key={"message"+index}>{message}</Li>

        ))}
        </UL></Message>

    )
}

export default Messages;
