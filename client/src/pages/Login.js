<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from '@apollo/react-hooks';
//import { Link } from "react-router-dom";
//import { LOGIN } from "../utils/mutations"
=======
import React from "react";
import { useMutation} from '@apollo/react-hooks';
>>>>>>> main
import Auth from "../utils/auth";
import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../utils/refreshTokenSetup';
import { ADD_USER } from "../utils/mutations";



function Login(props) {

  const [addUser] = useMutation(ADD_USER);
  const clientId = '900972042486-ho4224klutu5ot121jh6nao4d2tnfp8q.apps.googleusercontent.com';
  const onSuccess = res => {
    var id_token = res.getAuthResponse().id_token;
    localStorage.setItem('email', res.profileObj.email);
    localStorage.setItem('firstName', res.profileObj.givenName);
    localStorage.setItem('lastName', res.profileObj.familyName);
    localStorage.setItem('id_token',id_token)
    Auth.login(id_token);
      const mutationResponse = addUser({
       variables: {firstName: res.profileObj.givenName, lastName: res.profileObj.familyName,  email: res.profileObj.email}
    });
    refreshTokenSetup(res);
  };


  const onFailure = (res) => {
    console.log('{Login Failes] res:', res)

  };

 


  return (
    <div className="container signin">
      
      <GoogleLogin
        clientId={clientId}
        buttonText="Google Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        theme={'dark'}
        icon={'true'}
      />,
      {document.getElementById('googleButton')}
     
    </div>
  );
}

export default Login;
