import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import AlertMessage from '../components/AlertMessage'
import axios from '../utils/axios'


const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bg};
  padding: 5px;
  /* opacity: 50%; */
`

const Input = styled.input`
  height:20px;
  padding: 6px;
  border-radius: 5px;
  `
const Label = styled.label`
  font-weight: bold;
  margin-top : 10px;
  font-size: 15px;
  `

const Button = styled.button`
  height:30px;
  margin-top : 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:active{
    
    border-radius: 1px;
  }

`

const ChangePassword = () => {
  const [oldPassword,setOldPassword] = useState(null)
  const [newPassword,setNewPassword] = useState(null)
  const [confirmPassword,setConfirmPassword] = useState(null)
  const [statusMessage,setStatusMessage] = useState("");
  const [errorType,setErrorType] = useState(1);
  const showMessage = useRef(false);
  const { userData } = useSelector(state => state.user)
  // const [showMessage,setShowMessage] = useState(true);
  const handleUpdate = async () => {
  
    if(!oldPassword || !newPassword || !confirmPassword){
      setErrorType(() => 0);
      setStatusMessage(() => "Add all the information")
      showMessage.current = true;

      setTimeout(() => {
        showMessage.current = false;
        setErrorType(() => 1);
        setStatusMessage(() => "");
      }, 3000);
    }else if(confirmPassword !== newPassword){
      setErrorType(() => 0);
      setStatusMessage(() => "confirm password again")
      showMessage.current = true;
      setTimeout(() => {
          showMessage.current = false;
          setErrorType(() => 1);
          setStatusMessage(() => "");
      }, 3000);
      
    }else{
      const response = await axios.put(`/user/changePassword/${userData.userId}`,{} ,{
        params:{
          oldPassword : oldPassword,
          newPassword : newPassword
        },
        headers:{
          "authorisation" : `Bearer ${userData.token}`
        }
      })
      if(response.status === 200){
        setErrorType(() => 1);
        setStatusMessage(() => "Successful")
        showMessage.current = true;
        setTimeout(() => {
            showMessage.current = false;
            setErrorType(() => 1);
            setStatusMessage(() => "");
        }, 3000);
        
      }else if(response.status === 201){
        setErrorType(() => 0);
        setStatusMessage(() => "Wrong Password")
        showMessage.current = true;
        setTimeout(() => {
            showMessage.current = false;
            setErrorType(() => 1);
            setStatusMessage(() => "");
        }, 3000);
        
      }

    }
  }
  return (
    <Container>
      <Wrapper>
        <Label>Old Password</Label>
        <Input type='password' placeholder="Enter the old password" onChange={(e) => setOldPassword(e.target.value)} />
        <Label>New Password</Label>
        <Input type='password' placeholder="Enter the new password" onChange={(e) => setNewPassword(e.target.value)} />
        <Label>Confirm Password</Label>
        <Input type='password' placeholder="Confirm the password" onChange={(e) => setConfirmPassword(e.target.value)} />
        <Button onClick={handleUpdate} >Change</Button>
      </Wrapper>
      {(showMessage.current === true) && <AlertMessage type={errorType} message = {statusMessage} /> }
    </Container>
  )
}

export default ChangePassword