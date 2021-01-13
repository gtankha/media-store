import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { GoogleLogout } from 'react-google-login';
const clientId = '900972042486-ho4224klutu5ot121jh6nao4d2tnfp8q.apps.googleusercontent.com';
const email  = localStorage.getItem('email');
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
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>

          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}

          
            <a href="/" onClick={() => {


              Auth.logout();

            }}>

              {email &&
                <GoogleLogout
                  clientId={clientId}
                  // buttonText="Logout"
                  // onLogoutSuccess={Auth.logout()}
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
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="shopping bag">🛍️</span>
          Media Store
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
