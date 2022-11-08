
import React, { useEffect, useMemo, useState } from 'react'
import VideoCard from '../components/VideoCard'
import styled from 'styled-components'
import axios from '../utils/axios'
import { useSelector , useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom'
// import { useDispatch } from ''

const Container = styled.div`
    display: flex;
    flex-wrap : wrap;
    justify-content: space-between;
    @media (max-width: 600px) {
      flex-direction: column;
      flex-wrap: nowrap;
      /* justify-content: center; */
      align-items: center;
    }

`


const Home = ({ typeR }) => {
  const [videos,setVideos] = useState(null);
  // console.log(process.env.PROXY_URL);
  // alert(`you clicked ${typeR} `)
  // const mounted = false;
  console.log(typeR)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userData } = useSelector(state => state.user);
  const getvideos = async () => {
    const config = {
      headers : {
        "authorisation" : `Bearer ${userData?.token}`
      }
    }
    
      const response = await axios.get(`/video/${typeR}`,config);



    if(response.status === 202){

      console.log(response.data);
      dispatch(logout());
      navigate('/');
      setVideos(null);
      window.location.reload()
      return ;
    }else{
      setVideos(() => response.data);
    }
  }

  useEffect(()=>{
    getvideos();
    
  },[typeR])
  return (
    <Container>
        {videos && videos.map(video => (<VideoCard video = {video} key = {video.videoId} />))}
    </Container>
  )
}

export default Home