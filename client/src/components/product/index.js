import styled, { css } from 'styled-components'
import {shortDescription} from '../../utils/helpers'
import React, { Component }  from 'react';

function Product(prop)
{
    const {image,title,price,description} = prop;

    const Container = styled.div`
    width:1000px;
    height:200px;
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

    return (
        <Container>
            
            <Img/>
            <Card>
            <CardHead>
            <h5><b>{title}</b></h5><H3><b>${price}</b></H3><BuyBtn>Buy Now</BuyBtn><H4><span className="fa">&#xf201;</span> </H4>
            <BidBtn>Bid</BidBtn><Input placeholder='$21' step='1' min="21"></Input><ViewBtn>Expand Item</ViewBtn>
            
            </CardHead>
            <CardBody>
            <p>{shortDescription(description)}</p>
            </CardBody>
            </Card>

        </Container>
    )
}

export default Product;