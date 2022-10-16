import React ,{ useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserTab from './UserTab';
import UploadVideo from './UploadVideo';

const Container = styled.div`

    background-color: ${({ theme }) => theme.bg};
    position: sticky;
    top: 0px;
    height:47px;
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
    background-color: blue;
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

const Navbar = () => {
    const [userClicked,setUserClicked] = useState(false);
    const [uploadVideoClicked,setUploadVideoClicked] = useState(false);
    const {userData} = useSelector(state => state.user)
    return (
        <div>
            <Container>
                <Wrapper>
                    <Search>
                        <Input placeholder='Search' />
                        <SearchButton>
                            <SearchIcon />
                        </SearchButton>
                    </Search>
                    {
                        userData ? 
                        (<User >
                            {(userData.img) && <Image src = {`${userData.img}`} alt = {'n'} onClick={() => setUserClicked((prev) => !prev)}/> }
                            {!(userData.img) && <Item onClick={() => setUserClicked((prev) => !prev)}><AccountCircleIcon /></Item>}
                        </User>) : (
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
        </div>

    )
}

export default Navbar;