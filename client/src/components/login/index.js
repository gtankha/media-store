import styled, { css } from 'styled-components'




function Login() {
    const Wrapper = styled.div`
    margin-top:50px;
    width:100%;
    display:flex;
    justify-content:center;
    `;

    const Container = styled.div`
    padding:10px;
    width:320px;
    border-radius:20px;
    border: 1px solid black;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    ${props => props.hide && css`
     display:none;
`}
   
    `;


    const Input = styled.input`
    width:160px;
    border-radius:20px;
    border:1px solid #000;
    text-align:center;
    background-color:#eee;
    box-shadow: inset 0 0 5px #000000;
    outline:none;
    `;

    const Instead = styled.button`
border-radius:20px;
text-align:center;
margin-top:15px;
outline:none;
background-color:#00A598;
cursor:pointer;
`;



    const toggleSignup = function () {

        document.querySelector("#login").style.display = 'none';
        document.querySelector("#signup").style.display = 'flex';
    }

    const toggleLogin = function () {

        document.querySelector("#login").style.display = 'flex';
        document.querySelector("#signup").style.display = 'none';
    }

    return (
        <Wrapper>
            <Container id="login">
                <label>Email</label>
                <Input placeholder="Email"></Input>
                <label>Password</label>
                <Input placeholder="Password"></Input>
                <Instead onClick={toggleSignup}>Signup Instead</Instead>
            </Container>

            <Container hide id="signup">
                <label>Full Name</label>
                <Input placeholder="Full Name"></Input>
                <label>Email</label>
                <Input placeholder="Email"></Input>
                <label>Password</label>
                <Input placeholder="Password"></Input>
                <label>Confirm Password</label>
                <Input placeholder="Password"></Input>
                <Instead onClick={toggleLogin}>Login Instead</Instead>

            </Container>
        </Wrapper>

    )
}

export default Login;