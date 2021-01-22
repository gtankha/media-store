import React, { useEffect }  from "react";
import { GoogleLogout } from 'react-google-login';
import Auth from "../utils/auth";
// import ProductList from "../components/ProductList";
// import CategoryMenu from "../components/CategoryMenu";
// import Cart from '../components/Cart';
import Body from '../components/body';
import { useDispatch } from 'react-redux';

const clientId = '900972042486-ho4224klutu5ot121jh6nao4d2tnfp8q.apps.googleusercontent.com';





const Home = () => {

  

  const dispatch = useDispatch();

  useEffect(() => {

  const evtSource = new EventSource('http://localhost:3001/events');

      evtSource.addEventListener('UPDATE_PRODUCTS', function(evt) {
        
     const data = JSON.parse(evt.data);
     const type = evt.type;

     console.log("data length", data.length,type,evt)
     
     

     dispatch({
      type: type,
      products: data
    });

  },false); 

  },[dispatch])


  return (
  
    
      <Body/>



  );
};

export default Home;
