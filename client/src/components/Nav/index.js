import React,{useEffect} from "react";
import Auth from "../../utils/auth";
import { Link, NavLink, Route} from "react-router-dom";
import styled, { css } from 'styled-components'
import { GoogleLogout } from 'react-google-login';
import { useDispatch,useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { UPDATE_MESSAGES } from "../../utils/actions";

const clientId = '900972042486-ho4224klutu5ot121jh6nao4d2tnfp8q.apps.googleusercontent.com';
const email = localStorage.getItem('email');
const firstName = localStorage.getItem('firstName');
const lastName = localStorage.getItem('lastName');



function Nav() {

  const state = useSelector((state) => {
    return state
});

  const { cart,messages } = state;

  const UL = styled.ul `
  list-style-type: none;
 
  @media (max-width:1000px)
  {
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding-inline-start: 0px;

  }
  `;


  const Li = styled.li `
  
  @media (max-width:1000px)
  {
    margin-left:0px;
    margin-right:0px;
    display:flex;
    margin-top:5px;
    border-bottom: 1px solid black;
    text-align:center;
    align-items:center;
    justify-content:center;
    padding:10px;
    width:100px;
    background-color:  #3B7EA1;
    border-radius:20px;
  }
  @media (min-width:1001px)
  {
    margin-left:10px;
  }
  
  `;



  const SPAN = styled.span`
  color:#333;
  `;


  function showNavigation() {
    if (Auth.loggedIn()) {
    
     
      return (
        <UL className="flex-row">
          <Li className="mx-1">
            <NavLink to="/orderHistory">
              Orders
            </NavLink>
          </Li>

          <Li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}


            <a href="/" onClick={() => {


              Auth.logout();

            }}>

              {email &&
                <GoogleLogout
                  clientId={clientId}
                  buttonText="Logout"
                  render={renderProps => (
                    <div onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</div>
                  )}
                // onLogoutSuccess={Auth.logout()}
                theme={'dark'}
                >
                </GoogleLogout>
              }
            </a>
          </Li>
          <Li>  <NavLink to="/cart"><SPAN className="fa">&#xf291; ({cart.length})</SPAN></NavLink></Li>
          <Li><NavLink to="/messages"><SPAN className="fa">&#xf674; ({messages.length})</SPAN></NavLink></Li>

        </UL>


        
      );
    } else {
      return (
        <UL className="flex-row">
          <li className="mx-1">
          </li>
          
         
          {((window.location.pathname !== "/login")) &&
            <li className="mx-1">
              <NavLink to="/login">
                Login
            </NavLink>
            </li>
          
          }
        </UL>
      );
    }
  }

  return (
  

      <nav>
        {showNavigation()}
      </nav>
  
  );
}

export default Nav;
