import styled, { css } from 'styled-components'
import Auth from "../../utils/auth";
import { useMutation } from '@apollo/react-hooks';
import { shortDescription } from '../../utils/helpers'
import { ADD_TO_CART,REMOVE_FROM_CART} from '../../utils/actions'
import { useDispatch } from 'react-redux';
import moment from 'moment'
import {UPDATE_BID} from '../../utils/mutations';
import React,{ useEffect } from 'react';
import { idbPromise } from "../../utils/helpers";
// auction bid 
function Product(prop) {
    const { _id, image, title, price, description, cart, bidTimeStamp, bidValue, bidderName } = prop;

    

    const dispatch = useDispatch();
    const [updateProduct] = useMutation(UPDATE_BID);

    const minBid = bidValue +1;

    let updateData = null;

    useEffect(()=> {

    const timer = setInterval(updateTimeStamp,1000);
    let timeLeft = 0;

    
    function updateTimeStamp(){

       

        if(!bidTimeStamp) return;
       
        const m = moment(bidTimeStamp).format();
       
      
        const now = moment();
        timeLeft = moment.duration(now.diff(m));
        const expire = Math.floor(120 - timeLeft.asSeconds());

        if(expire <=0)
        {
        if(document.querySelector("#remainingTime"+_id)) document.querySelector("#remainingTime"+_id).textContent = "Sold!";
     
        return;
        }
       

       
        if(document.querySelector("#remainingTime"+_id)) document.querySelector("#remainingTime"+_id).textContent = hhmmss(expire);
    }
    },[dispatch])

    function pad(num) {
        return ("0"+num).slice(-2);
    }
    function hhmmss(secs) {
      var minutes = Math.floor(secs / 60);
      secs = secs%60;
      var hours = Math.floor(minutes/60)
      minutes = minutes%60;
      return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
      // return pad(hours)+":"+pad(minutes)+":"+pad(secs); for old browsers
    }


    const addToCart = function () {
        dispatch({
            type: ADD_TO_CART,
            product: {
                _id: _id,
                image: image,
                title: title,
                price: price,
                description: description
            }
        });

    }

    const removeFromCart = function () {

        const item = {_id: _id};
        idbPromise('cart', 'delete', item);

        dispatch({
            type: REMOVE_FROM_CART,
            _id: _id
        });


    }

    const placeBid = function () {

        if(!Auth.loggedIn())
        {
            alert("you must be logged in to place bids!")
            return
        }


          mutationResponse ();

       
        
    }

     async function mutationResponse ()
    {

        let value = document.querySelector("#bidInput"+_id).value;
        if(!value) value = minBid;
      

        if(!value || value <= bidValue) return;

        const email = localStorage.getItem('email');
        const firstName = localStorage.getItem('firstName');
        const lastName = localStorage.getItem('lastName');

        const stamp = bidTimeStamp ? bidTimeStamp : moment().format();

         const response = await updateProduct({
            variables: {
                _id:_id, 
                value:parseFloat(value), 
                bidTimeStamp:stamp.toString(), 
                bidderName:firstName+" "+lastName,
                bidderId:email 
            }
          });

    }

    const Container = styled.div`
    width:1000px;
    height:220px;
    padding:5px;
    display:flex;
    justify-content:space-between;
    @media (max-width:1000px) {
        width:100%;
        height:auto;
        flex-direction:column;
    }
    `;
    const Img = styled.div`
    height:200px;
    width:150px;
    background-image:url('images/${image}');
    background-repeat: no-repeat;
    background-size: cover;
    @media (max-width:1000px) {
        width:100%;
        height:350px;
    }
    `;
    const CardHead = styled.div`
    display:flex;
    flex-direction:row;
    margin-top:6px;
    @media (max-width:1000px) {
        flex-direction:column;
    }
    `;
    const Inner = styled.div`
    display:flex;
    `;
    const CardBody = styled.div`
    display:flex;
    margin-top:20px;
    width:100%;
    `;
    const Card = styled.div`
    border-top: 5px solid #FDB515;
    display:flex;
    flex-direction: column;
    margin-left:10px;
    width:80%;
    @media (max-width:1000px) {
        width:100%; 
    }
    `;
    const H3 = styled.h3`
    font-size:16px;
    margin-left:15px;
    @media (max-width:1000px) {
        margin-left:0px; 
    }

    `;

    const H4 = styled.h4`
    margin-left:15px;
    font-size:14px;
    @media (max-width:1000px) {
        margin-left:0px; 
    }
    `;

    const BuyBtn = styled.button`
    font-size:16px;
    border-radius: 20px;
    height: 20px;
    margin-left:5px;
    outline:none;
    cursor:pointer;
    background-color: ${props => props.delete ? "tomato" : "#FDB515"};
    box-shadow: 3px 3px;
    color:#000;
    white-space: nowrap;
    `;

    const DelBtn = BuyBtn;

    const BidBtn = styled.button`
    font-size:16px;
    border-radius: 20px;
    height: 20px;
    margin-left:5px;
    outline:none;
    cursor:pointer;
    background-color: #3B7EA1;
    box-shadow: 3px 3px;
    white-space: nowrap;
    `;

    const ViewBtn = styled.button`
    font-size:16px;
    border-radius: 20px;
    height: 20px;
    margin-left:35px;
    outline:none;
    cursor:pointer;
    background-color: #00A598;
    box-shadow: 3px 3px;
    white-space: nowrap;
    `;

    const Input = styled.input.attrs({ type: 'number' })`
    height:20px;
    width: 55px;
    border-radius:20px;
    font-size:14px;
    margin-left:15px;
    margin-right:5px;
    outline:none;
    text-align:center;
    `;

    if (cart === "no") {
        return (
            <Container>
                
                <Img />
               
                <Card>
                    <CardHead>
                        <h5><b>{title}</b></h5>
                        <Inner>
                        <H3><b>${price}</b></H3><BuyBtn onClick={addToCart}>Buy</BuyBtn>
                        <BidBtn onClick={placeBid}>Bid</BidBtn><Input id={"bidInput"+_id} placeholder={ minBid } step='1' min={minBid}></Input>
                        </Inner>
                        <Inner><span id={"remainingTime"+_id}></span> <H4 className="fa">&#xf201; {bidderName ? bidderName :""}</H4></Inner>
                       
                    </CardHead>
                    <CardBody>
                        <p>{shortDescription(description)}</p>
                    </CardBody>
                </Card>

            </Container>

        )
    }
    if (cart === "yes") {

        return (
            <Container>

                <Img />
                <Card>
                    <CardHead>
                        <h5><b>{title}</b></h5><H3><b>${price}</b></H3><DelBtn delete onClick={removeFromCart}>Remove</DelBtn>
                    </CardHead>
                    <CardBody>
                        <p>{shortDescription(description)}</p>
                    </CardBody>
                </Card>

            </Container>

        )
    }
}

export default Product;