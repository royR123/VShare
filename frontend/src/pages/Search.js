import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import VideoCard from '../components/VideoCard'
import axios from '../utils/axios'

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap : 5px;
`

const Search = () => {
    const [videos,setVideos] = useState(null);
    const path = useLocation();
    console.log(path.search);
    const fetchVideos = async () => {
        const response = await axios.get(`/video/search${path.search}`);
        setVideos(() => response.data);
    }
    useEffect(()=>{
        fetchVideos();
    },[path?.search])
    return (
        <Container>
            {videos?.map(video => (<VideoCard key={video.videoId} video = {video} />))}
        </Container>
    )
}

export default Search