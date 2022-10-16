
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from '../utils/axios'
const Container = styled.div`
    width: 250px;
    margin-bottom : 50px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.bg};
`
const Image = styled.img`
    width: 100%;
    height: 200px;
    background-color: #999;
`

const Details = styled.div``

const UserImage = styled.div``

const Texts = styled.div`
    padding: 5px;
`

const Title = styled.div`
    /* font-weight : bold; */
    
`

const UserName = styled.div`
    font-weight:lighter 
`

const Info = styled.div`
    font-weight:lighter
`

const VideoCard = ({ video }) => {
    // console.log(video.imgUrl);
    console.log(video.videoId);
    const vid_id = video.videoId;
    const [thisUser,setThisUser] = useState(null);
    const getThisUser = async () => {
        const response = await axios.get(`/user/getUser/${video.userId}`);
        setThisUser(() => response.data);
    }
    useEffect(() => {
        getThisUser();
    },[video.userId])
    return (
        <Link to = {`/video/${vid_id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <Container>
                <Image src= {video.imgUrl} />
                <Details>
                    <UserImage />
                    <Texts>
                        <Title>{video.title}</Title>
                        <UserName>{thisUser?.name}</UserName>
                        <Info>{`${video.views} views`} </Info>
                    </Texts>
                </Details>
            </Container>
        </Link>
    )
}

export default VideoCard;