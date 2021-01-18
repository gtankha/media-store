import React from "react";
import Auth from "../../utils/auth";
import { Link, NavLink, Route} from "react-router-dom";
import styled, { css } from 'styled-components'
import { GoogleLogout } from 'react-google-login';
const clientId = '900972042486-ho4224klutu5ot121jh6nao4d2tnfp8q.apps.googleusercontent.com';
const email = localStorage.getItem('email');
const firstName = localStorage.getItem('firstName');
const lastName = localStorage.getItem('lastName');



function Nav() {

  const UL = styled.ul `
  list-style-type: none;
  `;

  function showNavigation() {
    if (Auth.loggedIn()) {
      console.log(email);
      console.log(firstName);
      console.log(lastName);
      return (
        <UL className="flex-row">
          <li className="mx-1">
            <NavLink to="/orderHistory">
              Order History
            </NavLink>
          </li>

          <li className="mx-1">
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
          </li>
        </UL>
      );
    } else {
      return (
        <UL className="flex-row">
          <li className="mx-1">
          </li>
          
          {console.log (window.location.pathname)}
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
