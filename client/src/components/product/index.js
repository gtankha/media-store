import styled, { css } from 'styled-components'
import { shortDescription } from '../../utils/helpers'
import { ADD_TO_CART,REMOVE_FROM_CART } from '../../utils/actions'
import { useDispatch } from 'react-redux';
import React, { Component } from 'react';

function Product(prop) {
    const { _id, image, title, price, description, cart } = prop;

    const dispatch = useDispatch();

    const minBid = Math.ceil(price / 3);

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

        dispatch({
            type: REMOVE_FROM_CART,
            _id: _id
        });


    }

    const Container = styled.div`
    width:1000px;
    height:220px;
    padding:5px;
    display:flex;
    justify-content:space-between;
    `;
    const Img = styled.div`
    height:200px;
    width:150px;
    background-image:url('images/${image}');
    background-repeat: no-repeat;
    background-size: cover;
    `;
    const CardHead = styled.div`
    display:flex;
    margin-top:6px;
    `;
    const CardBody = styled.div`
    display:flex;
    margin-top:20px;
    `;
    const Card = styled.div`
    border-top: 5px solid #FDB515;
    display:flex;
    flex-direction: column;
    margin-left:10px;
    width:80%;
    `;
    const H3 = styled.h3`
    margin-left:30px;
    font-size:16px;
    `;

    const H4 = styled.h4`
    margin-left:35px;
    font-size:14px;
    `;

    const BuyBtn = styled.button`
    font-size:16px;
    border-radius: 20px;
    height: 20px;
    margin-left:5px;
    outline:none;
    cursor:pointer;
    background-color: #FDB515;
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
    height:16px;
    width: 55px;
    border-radius:20px;
    font-size:14px;
    margin-left:15px;
    outline:none;
    text-align:center;
    `;

    if (cart === "no") {
        return (
            <Container>

                <Img />
                <Card>
                    <CardHead>
                        <h5><b>{title}</b></h5><H3><b>${price}</b></H3><BuyBtn onClick={addToCart}>Buy Now</BuyBtn><H4><span className="fa">&#xf201;</span> </H4>
                        <BidBtn>Bid</BidBtn><Input placeholder={"$" + minBid.toString()} step='1' min={minBid}></Input><ViewBtn>Expand Item</ViewBtn>

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
                        <h5><b>{title}</b></h5><H3><b>${price}</b></H3><DelBtn onClick={removeFromCart}>Remove</DelBtn>
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