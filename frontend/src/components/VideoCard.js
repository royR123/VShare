
import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
const Container = styled.div`
    width: 250px;
    margin-bottom : 50px;
    cursor: pointer;
    background-color: ${({theme}) => theme.bg};
`
const Image = styled.div`
    width: 100%;
    height: 200px;
    background-color: #999;
`;

const Details = styled.div``;

const UserImage = styled.div``;

const Texts = styled.div`
    padding: 5px;
`;

const Title = styled.div`
    /* font-weight : bold; */
    
`;

const UserName = styled.div`
    font-weight:lighter 
`;

const Info = styled.div`
    font-weight:lighter
`;

const VideoCard = () => {
  return (
    <Link to = "/video/test" style={{textDecoration:"none" , color : "inherit"}}>
        <Container>
        <Image src = '' />
            <Details>
            <UserImage />
            <Texts>
                    <Title>Test Video</Title>
                    <UserName>Ritik</UserName>
                    <Info>5,555 </Info>
                </Texts>
            </Details>
        </Container>
    </Link>
    )
}

export default VideoCard