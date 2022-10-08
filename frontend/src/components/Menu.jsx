import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
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
const Container = styled.div`
    flex : 1;
    background-color : ${({theme}) => theme.bg};
    color : ${({theme}) => theme.text};
    height: 100vh;
    position: sticky;
    top: 0px;
    left: 0px;
`
const Wrapper = styled.div`
  padding: 10px 15px;

`
const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight : bold;
  margin-bottom : 23px;
`

const Item = styled.div`
  display : flex;
  padding: 1.5px 6px;
  align-items : center;
  cursor: pointer;
  gap : 20px;
  margin-top : 5px;

  &:hover{
    background-color: ${({theme}) => theme.bgLighter};
  }

`
const Menu = ({ whiteTheme , setWhiteTheme }) => {
  const handleClick = () =>{
    setWhiteTheme((prev) => !prev);
  }
    return (

    <Container>
      <Wrapper>
      <Link to = "/" style={{textDecoration : "none" , color : 'inherit'}}>
        <Logo>
          VSW
        </Logo>
      </Link>
        <Item>
          <ExploreIcon/>
          Explore
        </Item>
        <Item>
          <SubscriptionsIcon />
          Subscriptions
        </Item>
        <Item>
          <VideoLibraryIcon />
          Library
        </Item>
        <Item>
          <HistoryIcon />
          History
        </Item>
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
        <Item onClick={handleClick}>
          <LightModeIcon/>
          {(whiteTheme) ? 'Dark Mode' : 'Light Mode'}
        </Item>
        
      </Wrapper>
    </Container>
  );
}

export default Menu;
