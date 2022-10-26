import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SportsIcon from '@mui/icons-material/Sports';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SettingsIcon from '@mui/icons-material/Settings';
import ReportIcon from '@mui/icons-material/Report';
import HelpIcon from '@mui/icons-material/Help';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';

const MainContainer = styled.div`
  z-index : 100;
  position: absolute;
  top : 0px;
  width: 100vw;
  height: 100vh;
  @media (min-width : 600px) {
      display: none;
  }
  background-color: rgba(85, 82, 82, 0.778);
  animation-name: move;
  animation-duration: 1s;
  @keyframes move {
    0%{
      right:100vw;
    }
    100%{
      right:0;
    }
  }

`
const Container = styled.div`
    background-color : ${({theme}) => theme.bg};
    color : ${({theme}) => theme.text};
    height: 100vh;
    width:200px;
    /* z-index:3; */
`
const Wrapper = styled.div`
  padding: 10px 15px;

`

const Item = styled.div`
  display : flex;
  padding: 1.5px 6px;
  align-items : center;
  cursor: ${'pointer'};
  gap : 20px;
  margin-top : 5px;

  &:hover{
    background-color: ${({theme}) => theme.bgLighter};
  }

`

const CloseBtn = styled.div`
    display: flex;
    justify-content: end;
    padding: 3px;
    cursor: pointer;
`


const SlidingMenu = ({ whiteTheme , setWhiteTheme , setOpen }) => {
  const {userData} = useSelector(state => state.user)
  const handleClickTheme  = () => {
    setWhiteTheme((prev) => !prev)
  }
  const handleCloseBtn = () => {
    setOpen((prev) => !prev);
  }
    return (
    <MainContainer>
      <Container>
        <CloseBtn onClick={handleCloseBtn} >
          <CloseIcon />
        </CloseBtn>
        <Wrapper>
        <Link to = "/explore" style={{textDecoration : "none" , color : 'inherit'}}>
          <Item>
            <ExploreIcon/>
            Explore
          </Item>
        </Link>
        {
          userData &&

          <Link to = "/subscribed" style={{textDecoration : "none" , color : 'inherit'}}>
            <Item>
              <SubscriptionsIcon />
              Subscriptions
            </Item>
          </Link>

        }
        {
          userData &&
          <Item>
            <VideoLibraryIcon />
            Library
          </Item>

        }

        {
          userData &&
          <Item>
            <HistoryIcon />
            History
          </Item>
          
        }
          <Item>
            <LibraryMusicIcon />
            Music
          </Item>
          <Item>
            <SportsIcon/>
            Sports
          </Item>
          <Item>
            <SportsEsportsIcon/>
            Gaming
          </Item>
          <Item>
            <MovieCreationIcon/>
            Movies
          </Item>
          <Item>
            <NewspaperIcon/>
            News
          </Item>
          <Item>
            <LiveTvIcon/>
            Live
          </Item>
          <Item>
            <SettingsIcon/>
            Settings
          </Item>
          <Item>
            <ReportIcon/>
            Report
          </Item>
          <Item>
            <HelpIcon/>
            Help
          </Item>
          <Item onClick={handleClickTheme}>
            <LightModeIcon/>
            {(whiteTheme) ? 'Dark Mode' : 'Light Mode'}
          </Item>
          
        </Wrapper>
      </Container>

    </MainContainer>
  );
}

export default SlidingMenu;
