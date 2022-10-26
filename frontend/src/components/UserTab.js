import React from 'react'
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { logout , loginStart } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 45px;
    margin-left: auto;
    margin-top: 5px;
`
const Item = styled.div`
    cursor: pointer;
    border-radius:50%;
    padding-left: 10px;
    padding-top: 7px;
    &:hover{
        box-shadow : 2px 2px 10px grey;
    }
`

const UserTab = ({ setUserClicked , setUploadVideoClicked , user}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleAddVideoClick = () => {
        setUploadVideoClicked(() => true);
    }
    const handleLogoutClick = () => { 
        // const user = useSelector(state => state.user);
        dispatch(loginStart());
        dispatch(logout());
        setUserClicked((prev) => !prev);
        navigate('/');
        window.location.reload();
    }
    const handleUserProfile = () => {
        navigate('/user');
    }
    return (
        <Container>
            <Item onClick={handleAddVideoClick}>
                <VideoCallIcon />
            </Item>
            <Item onClick = {handleUserProfile} >
                <ManageAccountsIcon />
            </Item>
            <Item onClick = {handleLogoutClick} >
                <LogoutIcon />
            </Item>
        </Container>

    )
}

export default UserTab