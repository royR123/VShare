
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
import ShareSharpIcon from '@mui/icons-material/ShareSharp';
import Sharethis from '../components/Sharethis'
import Comments from '../components/Comments'
import { addSubscriptions } from '../redux/userSlice'


const Container = styled.div`
  margin: 0px;
  padding: 0px;
  width: 100%;
  @media (max-width : 600px) {
    position: relative;
    top: -50px;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const Content = styled.div`
  width : 100%; 
`
const VideoWrapper = styled.div`

width: 100%;
margin: auto;
max-width: 1000px;
display:flex;
  justify-content: center;
  margin-inline: auto;
  &:hover{
    box-shadow: 2px 2px 10px ${({theme}) => theme.bg};
  }

  `
const VideoSection = styled.video`

    height: 230px;
    width: 100%;
    
    `
const Options = styled.div`
  width: 100%;

  margin-top: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  `
const Wrapper = styled.div`
  
`

const Title = styled.text`
  font-weight : bolder;
  width : 100%;
`
const Button = styled.button`
  background-color : inherit;
  color: ${({theme}) => theme.text};
  cursor: pointer;
  border:none;
  border-radius: 50%;
  &:active{
    background-color : grey;
  }
`

const ChannelInfo = styled.div`
  width: 100%;
  display : flex;
  align-items: center;
  height : 50px;
  justify-content: space-between;
  background-color: ${({theme}) => theme.bgLighter};
`
const Image = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`
const SubscribeBtn = styled.span`
  background-color: red;
  color : white;
  height: 40px;
  font-weight: bold;
  padding: 6px;
  border-radius: 5px;
  `
const SubscribedBtn = styled.span`
  background-color: white;
  color: red;
  height: 40px;
  font-weight: bold;
  padding: 6px;
  border-radius: 5px;
`
const CommentsSection = styled.div`
  width:100%;
  margin-top: 20px;
  position: sticky;
  top: 40px;

`


const Video = () => {
  const [showShare,setShowShare] = useState(false);
  const [channel,setChannel] = useState(null);
  const { userData } = useSelector((state) => state.user)
  const { videoData } = useSelector((state) => state.video)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(useLocation());
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

  const handleShare = () => {
    setShowShare((pv) => !pv);
  }
  const handleSubscribe = async () => {
    if(!userData){
      navigate('/auth');
      return;
    }
    if(!userData?.subscriberedUsers?.includes(videoData.userId)){
      const response = await axios.put(`/user/subscribe/${userData.userId}`,{} , {
        params : {
          subUserId : videoData.userId
        },
        headers :{
          "authorisation" : `Bearer ${userData?.token}`
        }
      })
      dispatch(addSubscriptions(videoData.userId));
    }else{
      const response = await axios.put(`/user/unsubscribe/${userData.userId}`,{},{
        params : {
          subUserId : videoData.userId
        },
        headers :{
          "authorisation" : `Bearer ${userData?.token}`
        }        
      })
      dispatch(addSubscriptions(videoData.userId));
    }
  }
  const fetchVideo = async () => {
    try{
      const response = await axios.get(`/video/get/${vid_id}`);
      console.log(response.data);
      await axios.put(`video/addView/${vid_id}`);
      dispatch(fetchStart());
      dispatch(fetchSuccess(response.data));
      const channelinfoResponse = await axios.get(`/user/getUser/${videoData.userId}`);
      setChannel(() => channelinfoResponse.data);
      console.log(channel);
    }catch(error){
      console.log(error);
      dispatch(fetchFailure());
    }
  }
  const goToChannel = () => {
    navigate(`/channelPage/${videoData.userId}`);
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
      </VideoWrapper>
      <Title>{videoData?.title}</Title>
      <Options>
        <Button onClick={handleLike}>
        {!videoData?.likes?.includes(userData?.userId)? 
            <ThumbUpOutlinedIcon  />
            :         
            <ThumbUpIcon />
        }
        </Button>
        <Button onClick={handleDislike} >
        {!videoData?.dislikes?.includes(userData?.userId)? 
            <ThumbDownOffAltOutlinedIcon  /> 
            : 
            <ThumbDownICon />
          }
        </Button>
        <Button onClick={handleShare} >
          <ShareSharpIcon />
        </Button>
        
      </Options>
      {
        showShare &&
        <Wrapper>
          
          <Sharethis />
        </Wrapper>

      }
      <ChannelInfo>
        <Image src= {channel?.img} onClick = {goToChannel} />
        <Button onClick={handleSubscribe} >
          {userData?.subscriberedUsers?.includes(videoData.userId) ? <SubscribedBtn>Subscribed</SubscribedBtn> 
          : <SubscribeBtn>Subscribe</SubscribeBtn> }
        </Button>
      </ChannelInfo>
      <CommentsSection>
      <Comments />

      </CommentsSection>
      </Content>
    </Container>
  )
}

export default Video