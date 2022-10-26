import React ,{ useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserTab from './UserTab';
import UploadVideo from './UploadVideo';
import SlidingMenu from './SlidingMenu';

import axios from '../utils/axios'

const MainContainer = styled.div`

`
const Container = styled.div`
    background-color: ${({ theme }) => theme.bg};
    position: sticky;
    top: 0px;
    height:47px;
    width: 100%;

`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;

`

const Search = styled.div`
    display: flex;
    margin: auto;
    /* background-color: red; */
    width : 40vw;
    border-radius : 10px;
    background-color : ${({ theme }) => theme.bgLighter};
    justify-content: space-between;
    align-items: center;
`

const Input = styled.input`
    /* position: */
    width: 80%;
    border : none;
    color:  ${({ theme }) => theme.text};
    /* color: red; */
    background-color: transparent;
    &:focus{
        outline:none;
    }
`
const User = styled.div`
    display: flex;
    flex-direction: column;
    gap : 3px;
    align-items:center ;
    justify-content: center;
    cursor: pointer;
    border: none;
    ` 
const Image = styled.img`
    height: 45px;
    width: 40px;
    border-radius: 50%;
    /* background-color: blue; */
    border: none;
    /* hie */
    `

const SearchButton = styled.div`
    display: flex;
    align-items: center;
    &:hover{
        cursor: pointer;
    }
`
const Button = styled.div`
    display: flex;
    gap : 5px;
    border : 1px solid blue;
    color : blue;
    margin: 5px;
    padding: 4px 5px;
    border-radius: 4px;
    cursor: pointer;
    align-items: center;
    /* background-color : transparent; */
`
const Item = styled.div`
    height: 45px;
    width: 40px;
    border-radius: 50%;
    /* background-color: blue; */
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
`
const MenuIconContainer = styled.div`
    cursor: pointer;
    &:active{
        box-shadow: 2px 2px 10px ${({theme}) => theme.bgLighter};
    }
    @media (min-width: 600px){
      display:none;
    }
    
    padding: 5px;
`
const SlidingMenuContainer = styled.div`
    position: sticky;
    left : 0px;
    top:0px;


`


const Navbar = ({  whiteTheme , setWhiteTheme}) => {
    const [userClicked,setUserClicked] = useState(false);
    const [uploadVideoClicked,setUploadVideoClicked] = useState(false);
    const {userData} = useSelector(state => state.user)
    const [searchQuery,setSearchQuery] = useState(null);
    const navigate = useNavigate();
    const handleClick = () => {
        setOpen((prev) => !prev)
    }
    const handleSearch = async () => {
        navigate(`/search?q=${searchQuery}`);
    }
    const [open,setOpen] = useState(false);
    
    return (<MainContainer>
                <Container>
                    <Wrapper>
                            <MenuIconContainer onClick={handleClick} >
                                {!open && <MenuIcon />}
                            </MenuIconContainer>
                        <Search>
                            <Input placeholder='Search' onChange={(e) => setSearchQuery(e.target.value)}/>
                            <SearchButton onClick={handleSearch} >
                                <SearchIcon />
                            </SearchButton>
                        </Search>
                        {
                            userData ? 
                            (
                            <User >
                                {(userData.img) && <Image src = {`${userData.img}`} alt = {'n'} onClick={() => setUserClicked((prev) => !prev)}/> }
                                {!(userData.img) && <Item onClick={() => setUserClicked((prev) => !prev)}><AccountCircleIcon /></Item>}
                            </User>
                            ) : (
                                <Link to="auth" style={{ textDecoration: "none", color: "inherit" }}>
                                    <Button>
                                        <AccountCircleIcon />
                                        SignUp
                                    </Button>
                            </Link>)
                        } 
                    </Wrapper>
                    {userClicked &&  <UserTab setUserClicked = {setUserClicked} setUploadVideoClicked = {setUploadVideoClicked} />}

                </Container>
                {uploadVideoClicked && <UploadVideo setUploadVideoClicked = {setUploadVideoClicked} />}
                {open &&  
                        <SlidingMenu whiteTheme={whiteTheme} setWhiteTheme = {setWhiteTheme} setOpen = {setOpen} />
                }

        </MainContainer>)
}

export default Navbar;