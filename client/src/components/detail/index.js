import styled, { css } from 'styled-components'

function Detail(prop)
{
    const {image,title,price,description} = prop;

    const Wrapper = styled.div`
    display:flex;
    justify-content:center;
    margin-top:50px;

    `;

    const Container = styled.div`
    width:50%;
    border-bottom: 1px solid #888;
    padding:5px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    `;
    const Img = styled.div`
    height:450px;
    width:600px;
    background-image:url('${image}');
    background-repeat: no-repeat;
    background-size: cover;
    `;
    const CardHead = styled.div`
    display:flex;
    `;
    const CardBody = styled.div`
    display:flex;
    `;
    const Card = styled.div`
    border-top: 5px solid #FDB515;
    display:flex;
    flex-direction: column;
    margin-left:10px;
    margin-top:30px;
    width:80%;
    `;
    const H3 = styled.h3`
    margin-left:30px;
    `;

    const H4 = styled.h4`
    margin-left:35px;
    `;

    const BuyBtn = styled.button`
    border-radius: 20px;
    height: 20px;
    margin-top:20px;
    margin-left:5px;
    outline:none;
    cursor:pointer;
    background-color: #FDB515;
    box-shadow: 3px 3px;
    color:#000;
    white-space: nowrap;
    `;

    const BidBtn = styled.button`
    border-radius: 20px;
    height: 20px;
    margin-top:20px;
    margin-left:5px;
    outline:none;
    cursor:pointer;
    background-color: #3B7EA1;
    box-shadow: 3px 3px;
    `;

    const Input = styled.input.attrs({ type: 'number' })`
    height:16px;
    width: 55px;
    border-radius:20px;
    margin-top:20px;
    margin-left:15px;
    outline:none;
    text-align:center;
    `;

    return (
        <Wrapper>
        <Container>     
            <Img/>
            <Card>
            <CardHead>
            <h3>{title}</h3><H3>${price}</H3><BuyBtn>Buy Now</BuyBtn><H4><span className="fa">&#xf201;</span> $20</H4><BidBtn>Bid</BidBtn><Input placeholder='$21' step='1' min="21"></Input>
            
            </CardHead>
            <CardBody>
            <p>{description}</p>
            </CardBody>
            </Card>

        </Container>
        </Wrapper>
    )
}

export default Detail;