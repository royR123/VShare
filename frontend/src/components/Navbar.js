import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Container = styled.div`

    background-color: ${({theme}) => theme.bg};
    position: sticky;
    top: 0px;
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
    background-color : ${({theme}) => theme.bgLighter};
    justify-content: space-between;
    align-items: center;
`

const Input = styled.input`
    /* position: */
    width: 80%;
    border : none;
    color:  ${({theme}) => theme.text};
    /* color: red; */
    background-color: transparent;
    &:focus{
        outline:none;
    }
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


const Navbar = () => {
  return (
    <Container>
        <Wrapper>
            <Search>
                <Input placeholder='Search' />
                <SearchButton>
                    <SearchIcon />
                </SearchButton>
            </Search>
            <Link to = "auth" style={{textDecoration : "none" , color : "inherit"}}>
            <Button>
                <AccountCircleIcon />
                SignUp
            </Button>
            </Link>
        </Wrapper>

    </Container>
  )
}

export default Navbar