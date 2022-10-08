
import React from 'react'
import VideoCard from '../components/VideoCard'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-wrap : wrap;
    justify-content: space-between;

`


const Home = () => {
  return (
    <Container>
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
    </Container>
  )
}

export default Home