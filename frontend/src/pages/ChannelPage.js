import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import VideoCard from '../components/VideoCard'
import axios from '../utils/axios'

const Container = styled.div`

`
const Header = styled.div`
    position: sticky;
    top:50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Image = styled.img`
    height: 100px;
    width: 100px;
    border-radius: 50%;
`
const Text = styled.div`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 2rem;
    display: flex;
    flex-direction: column;
`
const Properties = styled.span`
    display: flex;
    font-size: 1rem;

`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`
const ChannelPage = () => {
    const path = useLocation().pathname;
    const channelId = path.split('/')[2];
    console.log(channelId);
    const [channel,setChannel] = useState(null);
    const [videos,setVideos] = useState(null);
    const fetchChannel = async () => {
        const response = await axios.get(`/user/getUser/${channelId}`);
        setChannel(() => response.data);
    }
    const fetchVideos = async () => {
        const response  = await axios.get(`/user/videos/${channelId}`);
        setVideos(() => response.data);
    } 
    useEffect(()=>{
        fetchChannel();
        fetchVideos();
    },[])
    return (
        <Container>
            <Header>
                <Image src={channel?.img} />
                <Text>
                    {channel?.name}
                    <Properties>
                        {`${channel?.subscribers} subcribers`}
                    </Properties>
                </Text>
            </Header>
            <Content>
                {videos && videos.map((video) => (<VideoCard video = {video} key = {video.videoId} />))}
            </Content>
        </Container>

    )
}

export default ChannelPage