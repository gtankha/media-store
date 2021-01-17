import React from "react";
import Auth from "../../utils/auth";
import { Link, NavLink, Route} from "react-router-dom";
import { GoogleLogout } from 'react-google-login';
const clientId = '900972042486-ho4224klutu5ot121jh6nao4d2tnfp8q.apps.googleusercontent.com';
const email = localStorage.getItem('email');
const firstName = localStorage.getItem('firstName');
const lastName = localStorage.getItem('lastName');


function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      console.log(email);
      console.log(firstName);
      console.log(lastName);
      return (
        <ul className="flex-row">
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
                    <a href onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</a>
                  )}
                // onLogoutSuccess={Auth.logout()}
                theme={'dark'}
                >
                </GoogleLogout>
              }
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
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
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <NavLink to="/">
          <span role="img" aria-label="shopping bag">🛍️</span>
          Media Store
        </NavLink>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
