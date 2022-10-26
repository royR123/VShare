
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link
} from "react-router-dom";

import HomeP from './pages/Home';
import Video from './pages/Video';

import styled, { ThemeProvider } from 'styled-components'
import Menu from './components/Menu'
import Navbar from './components/Navbar';
import {darkTheme , lightTheme} from './utils/Theme.js'
import Auth from './components/Auth';
import Search from './pages/Search';
import UserProfile from './pages/UserProfile';
import ChangePassword from './pages/ChangePassword';
import YourVideos from './pages/YourVideos';

const Container = styled.div`
  display : flex;
  min-height: 100vh;
`

const Main = styled.div`
  background-color: ${({theme}) => theme.bgLighter};
  color: ${({theme}) => theme.text};
  flex : 6;
`

const Wrapper = styled.div`
  padding: 20px 66px;
  /* padding-top : 26px; */
`
const MenuContainer = styled.div`
    @media (max-width: 600px){
      display: none;
    }
`


function App() {
  const [whiteTheme,setWhiteTheme] = useState(false);
  return (
    <ThemeProvider theme={(whiteTheme) ? lightTheme : darkTheme}>
      <Container>
        <Router>

        <MenuContainer>
          <Menu whiteTheme={whiteTheme} setWhiteTheme = {setWhiteTheme} />
        </MenuContainer>
        
        <Main >
          <Navbar whiteTheme={whiteTheme} setWhiteTheme = {setWhiteTheme}   />
          <Wrapper>
            <Routes>
              <Route path='/'>
                <Route index element = {<HomeP typeR = 'random' />} />
                <Route path = 'explore' element = {<HomeP typeR = 'trending' />} />
                <Route path = 'subscribed' element = {<HomeP typeR = 'subscribed' />} />
                <Route path = 'search' element = {<Search />} />
                <Route path = 'user' > 
                  <Route index element = {<UserProfile />} />
                  <Route path = 'changePassword' element = {<ChangePassword/>} />
                  <Route path = 'yourVideos' element = {<YourVideos/>} />
                </Route>
                <Route path = 'video'>
                  <Route path=':id' element = {<Video />} />
                </Route>
                <Route path = 'auth' element = {<Auth />} />
              </Route>
            </Routes>
          </Wrapper>
        </Main>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
