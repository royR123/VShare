import React from 'react'
import styled from 'styled-components'
import { 
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share"
import { useLocation } from 'react-router-dom'
const Container = styled.div`
    position : fixed;
    
    animation-name: shareAnimation;
    animation-duration: 1s;
    animation-timing-function : ease-in-out;
    @keyframes shareAnimation {
        0%{
        top : 100vh;
        }
        100%{
        top:70vh;
        }
    }
    background-color: rgba(255, 255, 255, 0.278);
    height : 30vh;
    width : 200px;
    border-radius: 5px;
    box-shadow: 2px 2px 10px white;
    z-index : 200;
`
const Wrapper = styled.div`
    display: flex;
    flex-wrap : wrap ;
    gap : 10px;
`
const Sharethis = () => {
    
    return (
        <Container>
            <Wrapper>
                <EmailShareButton url = {require('../utils/baseUrlFrontend') + useLocation().pathname} >
                    <EmailIcon size={40} round />
                </EmailShareButton>
                <FacebookShareButton  url = {'https://linkedin.com'} >
                    <FacebookIcon size={40} round />
                </FacebookShareButton>
                <WhatsappShareButton  url = {require('../utils/baseUrlFrontend') + useLocation().pathname} >
                    <WhatsappIcon size={40} round />
                </WhatsappShareButton>
            </Wrapper>
        </Container>
    )
}

export default Sharethis