import React, { useEffect }  from "react";
import { GoogleLogout } from 'react-google-login';
import Auth from "../utils/auth";
// import ProductList from "../components/ProductList";
// import CategoryMenu from "../components/CategoryMenu";
// import Cart from '../components/Cart';
import Body from '../components/body';
import { useDispatch } from 'react-redux';

const clientId = '900972042486-ho4224klutu5ot121jh6nao4d2tnfp8q.apps.googleusercontent.com';
let prevUpdate = null;


const Home = () => {

  

  const dispatch = useDispatch();

  useEffect(() => {

  const evtSource = new EventSource('http://localhost:3001/events');
  const evtSource2 = new EventSource('http://localhost:3001/events');



     evtSource2.addEventListener('UPDATE_MESSAGES', function(evt) {

  
    const data = JSON.parse(evt.data);
    const type = evt.type;

    //alert(data.messages.products)
    console.log(data.orders)

    //alert(evt.data)

    dispatch({
      type: type,
      messages: data.messages.reverse()
    });

  })
   

   


      evtSource.addEventListener('UPDATE_PRODUCTS', function(evt) {
        
     const data = JSON.parse(evt.data);
     const type = evt.type;

     if(!prevUpdate)
     {
       prevUpdate = data;
     }
     else if(isSameObject(data))
     {
      return;
     }

     prevUpdate = data;

     console.log("data length", data.length,type,evt)
     
     

     dispatch({
      type: type,
      products: data
    });

  },false); 

  },[dispatch])

  const isSameObject = function(_data) {

    if(_data.length != prevUpdate.length) return false;

    for (let i = 0; i < _data.length; i++)
    {
    for (let n in _data[i])
    {

      console.log("datas",_data[i][n],prevUpdate[i][n]);

      if(_data[i][n] != prevUpdate[i][n]) return false;


    }
    
    }

  return true;

  }

  return (
  
    
      <Body/>



  );
};

export default Home;
