
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from '../utils/axios'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltICon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
const Container = styled.div`
    width: 260px;
    height : 300px ;
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
    font-weight:lighter ;
`

const Info = styled.div`
    display:flex;
    font-weight:lighter;
    width: 250px;
    justify-content: space-between;
`
const Popularity = styled.div`
    display: flex;
    gap:10px;
    justify-content: space-between;
    align-items: center;
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
                        <Info>
                            {`${video.views } views`}
                            <Popularity>
                                <>
                                {`${video?.likes?.length}`} <ThumbUpAltIcon />
                                </>
                                <>
                                {`${video?.dislikes?.length}`}<ThumbDownAltICon />
                                </>
                            </Popularity>
                        </Info>
                    </Texts>
                </Details>
            </Container>
        </Link>
    )
}

export default VideoCard;