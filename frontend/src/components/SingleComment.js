import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "../utils/axios"


const Container = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    background-color: ${({theme}) => theme.bg};
    padding: 5px;
    border-radius: 5px;
`
const Image = styled.img`
    width: 20px;
    height : 20px;
    border-radius : 50% ;
`
const Text = styled.span`
    font-size: 0.8rem;
    font-weight: lighter;
`
const SingleComment = ({userId , text}) => {
    const [user,setUser] = useState(null);
    const getUser = async () =>{
        try {
            const response = await axios.get(`/user/getUser/${userId}`);       
            setUser(() => response.data);
        } catch (error) {
            
        }
    }
    useEffect(() => {
        getUser();
    },[])
    return (
        <Container>
            <Image src = {user?.img} />
            <Text>
                {text}
            </Text>
        </Container>

    )
}

export default SingleComment