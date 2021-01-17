import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations"
import Auth from "../utils/auth";
import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../utils/refreshTokenSetup';
import { ADD_USER } from "../utils/mutations";



function Login(props) {
  // const [formState, setFormState] = useState({ email: '', password: '' })
  // const [login, { error }] = useMutation(LOGIN);
  const [addUser] = useMutation(ADD_USER);


  const clientId = '900972042486-ho4224klutu5ot121jh6nao4d2tnfp8q.apps.googleusercontent.com';
  

  const onSuccess = res => {
    console.log('[Login Successs] currentUser:', res.profileObj);
    var id_token = res.getAuthResponse().id_token;
    console.log(id_token);
 
  
   // console.log (mutationResponse);
    localStorage.setItem('email', res.profileObj.email);
    localStorage.setItem('firstName', res.profileObj.givenName);
    localStorage.setItem('lastName', res.profileObj.familyName);
    localStorage.setItem('id_token',id_token)

    console.log ('profile ooo  ' + Auth.isTokenExpired(id_token));
    Auth.login(id_token);
    // console.log ('loading  :'  + loading);

    // const myPromise = new Promise(() => {
    //    return (users);
    // });

    // console.log (myPromise);
    
    // const myPromise2 = myPromise.then((result) => 
    //  { 
      //  console.log ('result:  ' + result);
     
      // let input =  {firstName: res.profileObj.givenName, lastName: res.profileObj.familyName,  email: res.profileObj.email}
     console.log("I am here");
      const mutationResponse = addUser({
       variables: {firstName: res.profileObj.givenName, lastName: res.profileObj.familyName,  email: res.profileObj.email}
    });
    console.log("I am here again");
   
  
    // })


    // console.log (myPromise2)
    
    //refreshTokenSetup(res);
  };



  const onFailure = (res) => {
    console.log('{Login Failes] res:', res)

  };

  // const handleFormSubmit = async event => {
  //   event.preventDefault();
  //   try {
  //     const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
  //     console.log (mutationResponse);
  //     const token = mutationResponse.data.login.token;
  //     console.log("tiktoken:   " + token);
  //     Auth.login(token);
  //   } catch (e) {
  //     console.log(e)
  //   }
  // };

  // const handleChange = event => {
  //   const { name, value } = event.target;
  //   setFormState({
  //     ...formState,
  //     [name]: value
  //   });
  // };

  return (
    <div className="container signin">
      {/* <Link to="/signup">
        ← Go to Signup
      </Link> */}

      {/* <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {
          error ? <div>
            <p className="error-text" >The provided credentials are incorrect</p>
          </div> : null
        }
        <div className="flex-row flex-end">
          <button type="submit">
            Submit
          </button>
        </div>
      </form> */}
      
      <GoogleLogin
        clientId={clientId}
        // render={renderProps => (
        //   <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
        // )}
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
