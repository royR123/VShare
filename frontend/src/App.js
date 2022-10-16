
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

const Container = styled.div`
  display : flex;
  
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


function App() {
  const [whiteTheme,setWhiteTheme] = useState(false);
  return (
    <ThemeProvider theme={(whiteTheme) ? lightTheme : darkTheme}>
      <Container>
        <Router>
        <Menu whiteTheme={whiteTheme} setWhiteTheme = {setWhiteTheme} />
        <Main >
          <Navbar />
          <Wrapper>
            <Routes>
              <Route path='/'>
                <Route index element = {<HomeP typeR = 'random' />} />
                <Route path = 'explore' element = {<HomeP typeR = 'trending' />} />
                <Route path = 'subscribed' element = {<HomeP typeR = 'subscribed' />} />
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
