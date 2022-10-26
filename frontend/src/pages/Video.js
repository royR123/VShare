
import { useEffect , useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation , useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from '../utils/axios'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownICon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import { fetchFailure, fetchStart, fetchSuccess ,like , dislike } from '../redux/videoSlice'


const Container = styled.div`

`

const Content = styled.div`
  
`
const VideoWrapper = styled.div`
  &:hover{
    box-shadow: 2px 2px 10px ${({theme}) => theme.bg};
  }
`
const Options = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const VideoSection = styled.video`
  min-height : 250px;
  width : 100%;
  object-fit : contain;
  display: flex;
  justify-content: center;
  align-items: center;

`
const Title = styled.h2`

`
const Button = styled.button`
  background-color : inherit;
  color: ${({theme}) => theme.text};
  cursor: pointer;
  border:none;
`

const Video = () => {
  const { userData } = useSelector((state) => state.user)
  const { videoData } = useSelector((state) => state.video)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  console.log(pathname) ; 
  const vid_id = pathname.split('/')[2];
  console.log(vid_id);
  const config = {
    headers : {
      "authorisation" : `Bearer ${userData?.token}`
    }
  }
  const handleLike = async () => {
    try {
      if(!userData){
        navigate('/auth');
        return;
      }
      const resp = await axios.put(`/video/like/${videoData?.videoId}`,{} , config );
      console.log(resp.data);
      dispatch(like(userData.userId));
    } catch (error) {
      console.log(error);
    }
  }
  const handleDislike = async () => {
    if(!userData){
      navigate('/auth');
      return;
    }
    try {
      const resp = await axios.put(`/video/dislike/${videoData?.videoId}`, {} ,config);
      console.log(resp.data);
      dispatch(dislike(userData?.userId));
    } catch (error) {
      console.log(error);
    } 
  }


  const fetchVideo = async () => {
    try{
      const response = await axios.get(`/video/get/${vid_id}`);
      console.log(response.data);
      await axios.put(`video/addView/${vid_id}`);
      dispatch(fetchStart());
      dispatch(fetchSuccess(response.data));
    }catch(error){
      console.log(error);
      dispatch(fetchFailure());
    }
  }

  useEffect(()=>{
    const fg = false;
    fetchVideo();
    console.log(videoData);
  },[vid_id]);
  return (
    <Container>
      <Content>
      <VideoWrapper>
        <VideoSection src = {videoData?.videoUrl} controls />
        <Title>{videoData?.title}</Title>
      </VideoWrapper>
      <Options>
        <Button onClick={handleLike}>
        {!videoData?.likes.includes(userData?.userId)? 
            <ThumbUpOutlinedIcon  />
            :         
            <ThumbUpIcon />
        }
        </Button>
        <Button onClick={handleDislike} >
        {!videoData?.dislikes.includes(userData?.userId)? 
            <ThumbDownOffAltOutlinedIcon  /> 
            : 
            <ThumbDownICon />
          }
        </Button>
        
      </Options>
      </Content>
    </Container>
  )
}

export default Video