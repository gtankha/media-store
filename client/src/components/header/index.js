import styled, { css } from 'styled-components'
import Nav from '../nav'

function Header () {


    const H1 = styled.h1 `
    margin-left: 30px;
    `;
    const Input = styled.input`
    width: 45%;
    height: 24px;
    font-size:18px;
    border: 1px solid black;
    border-right:0px; 
    border-left:0px; 
    padding:0 10px;
    outline: none;
    `;
    const Container = styled.div`
    padding: 20px;
    display:flex;
    height:30px;
    width:100%;
    align-items:center;
    border-bottom: 1px solid #888;
    `;
    const SearchBtn = styled.div`
    padding-top:3px;
    font-size:18px;
    background-color: #FDB515;
    border: 1px solid #000;
    border-left:0px;
    height:22px;
    width: 50px;
    border-radius: 0 20px 20px 0;
    cursor:pointer;
    text-align: center;

    `
    const Select = styled.select`
    width:80px;
    height:26px;
    border-radius: 20px 0 0 20px;
    border-right:0px;
    margin-left:20px;
    padding-left:5px;
    outline: none;
    `

    return (
        <Container>
        <H1>Media Store</H1>
        <Select>
        <option value="Movies">Movies</option>
        <option value="Games">Games</option>
        <option value="Books">Books</option>
        </Select>
        <Input></Input>
        <SearchBtn className="fa">&#xf002;</SearchBtn>
        <Nav/>
        </Container> 

    );

}

export default Header;