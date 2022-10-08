
import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  height: 60vh;
  width: 250px;
`



const Input = styled.input`
    height: 30px;
    border : none;
    margin-top: 7px;
    border-radius: 4px;
    &:focus{
      outline:none;
    }
`
const Button = styled.div`
    font-weight : bold;
    cursor: pointer;
    color: blue;
    border: 2px solid blue;
    margin-top: 7px;
    height: 30px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
      box-shadow: 10px 12px 20px ${({theme}) => theme.bg};
    }
    &:active{
      font-weight:normal;
    }
`
const Title = styled.div`
  font-weight : bolder;
  text-align: center;
  margin-bottom: 20px;
`
const Text = styled.span`
  font-weight: lighter;
`

const Change = styled.div`
  cursor: pointer;
  color : blue;
  font-weight:lighter;
`
const Auth = () => {

  const [forLogin,setForLogin] = useState(false);
  const handleChange = () =>{
      setForLogin((prev) => !prev)
  }
  const handleClick = () => {

  };
  return (
    <Container>

        <Title>
          {!forLogin ? 'SignUp' : 'Login'}
        </Title>
        <Input placeholder='username'required = {true}/>
        {!forLogin && <Input placeholder='email' required ={true} />}
        <Input type = 'password' placeholder='password' required/>
        <Button onClick={handleClick}> Submit </Button>
        <Text>{!forLogin ? 'already have an account?' : "Don't have an account?"}</Text>
        <Change onClick={handleChange}>{!forLogin ? 'Login' : 'SignUp'}</Change>
      
    </Container>
  )
}

export default Auth