
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import styled from "styled-components";
import VideoCard from "../components/VideoCard";
import axios from "../utils/axios";
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone'

const Container = styled.div`

`
const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
`
const Button = styled.span`
  color: red;
  &:hover{
    box-shadow: 2px 2px 10px red;
  }
  cursor: pointer;
  &:active{
    padding:5px;
  }
`
const YourVideos = () => {
  const [videos,setVideos] = useState(null);
  const [indicator,setIndicator] = useState(false);
  const { userData } = useSelector(state => state.user); 
  const fetchVideos = async () => {
    const response = await axios.get(`/user/videos/${userData.userId}`)
    setVideos(response.data);
  }
  const handleDelete = async (videoId) => {
    await axios.delete(`/video/delete/${userData.userId}`,{
      params : {
        videoId : videoId,
      },
      headers : {
        "authorisation" : `Bearer ${userData.token}`
      }
    });
    setIndicator((prev) => !prev)
  }
  useEffect(() => {
    fetchVideos();
  },[])
  return (
    <Container>
      {videos && videos.map(video => (
              <Item key = {video.videoId} >
                  <Button onClick={() => handleDelete(video.videoId)} >
                    <DeleteOutlineTwoToneIcon />
                  </Button>
                  <VideoCard video = {video} key = {video.videoId} />
              </Item>
        ))}
    </Container>
  )
}

export default YourVideos