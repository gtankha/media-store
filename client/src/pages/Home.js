import React from "react";
import { GoogleLogout } from "react-google-login";
import Auth from "../utils/auth";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
const clientId = "900972042486-ho4224klutu5ot121jh6nao4d2tnfp8q.apps.googleusercontent.com";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
    //    <div>
    //           <GoogleLogout
    //               clientId={clientId}
    //               // buttonText="Logout"
    //                onLogoutSuccess={console.log ("logged out")}
    //             ></GoogleLogout>

    //  </div>
  );
};

export default Home;
