
import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginFailure, loginStart , loginSuccess} from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  height: 60vh;
  width: 250px;
`

const Wrapper = styled.form`
  display:flex;
  flex-direction: column;
  width:250px;
  
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
const Button = styled.button`
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
  const [name,setName] = useState(null);
  const [email,setEmail] = useState(null);
  const [password,setPassword] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [forLogin,setForLogin] = useState(false);
  const handleChange = () =>{
      setForLogin((prev) => !prev)
  }
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      if(forLogin){
        if(!name || !password){
          dispatch(loginFailure());
          return;
        }
        const response = await axios.post(`/user/login`,{name , password});
        if(response.status !== 200){
          dispatch(loginFailure());
          return;
        }
        console.log(response.data);
        dispatch(loginSuccess(response.data));
        navigate('/');
        console.log(response);
      }else{
        if(!name || !password || !email){
          dispatch(loginFailure());
          return;
        }
        const response = await axios.post(`/user/signup`,{
          name , email , password
        });
        if(response.status !== 200){
          dispatch(loginFailure());
          return;
        }
        console.log(response.data);
        dispatch(loginSuccess(response.data));
        navigate('/');
        console.log(`${response} is response`);
      }
    } catch (error) {
      dispatch(loginFailure());
    }
    setName(null);
    setEmail(null);
    setPassword(null);
  };
  return (
    <Container>

        <Title>
          {!forLogin ? 'SignUp' : 'Login'}
        </Title>
        <Wrapper>
          <Input type = 'text' placeholder='username'required = {true} onChange = {(e) => setName(() => e.target.value)} />
          {!forLogin && <Input type = 'email' placeholder='email' required ={true} onChange = {(e) => setEmail(() => e.target.value)} />}
          <Input type = 'password' placeholder='password' required = {true} onChange = {(e) => setPassword(() => e.target.value)} />
          <Button onClick={handleClick} type = 'submit' > Submit </Button>
          <Text>{!forLogin ? 'already have an account?' : "Don't have an account?"}</Text>
          <Change onClick={handleChange}>{!forLogin ? 'Login' : 'SignUp'}</Change>
        </Wrapper>
      
    </Container>
  )
}

export default Auth