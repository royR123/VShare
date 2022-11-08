import React, { useState ,useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import SendIcon from '@mui/icons-material/Send';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import SingleComment from './SingleComment';
const Container = styled.div`
  width: 100%;
  /* overflow-y: scroll; */
`
const Wrapper1 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Input = styled.input`
  margin-left: 4px;
  height: 20px;
  width: 80%;
  border-radius: 5px;
  border: none;
  background-color: rgba(194, 194, 194, 0.796);
  /* background-color: blue;  */
  
`
const Image = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;

`
const Button = styled.span`
  margin-left: 5px;
  color: green;
  cursor: pointer;
`

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  

`

const Comments = () => {
  const [newComment,setNewComment] = useState("");
  const [comments,setComments] = useState(null);
  const {userData} = useSelector((state) => state.user);
  const {videoData} = useSelector((state) => state.video);
  const navigate = useNavigate();
  const fg = useRef(false);
  const fetchComments = async () => {
    try {
      const response = await axios.get(`/comment/${videoData.videoId}`);
      setComments(() => response.data);
      
    } catch (error) {
      
    }
  }
  const handleAddComment = async () => {
    const config = {
      headers:{
        "authorisation" : `Bearer ${userData.token}`
      }
    };
    try {
      const response = await axios.post(`/comment/add/${userData.userId}`,{
        userId : userData.userId,
        videoId : videoData.videoId,
        text : newComment
      },config)
      fetchComments();
      setNewComment("");
    } catch (error) {
      
    }
  }
  useEffect(() => {
    fetchComments();
  },[])
  return (
    <Container>
      {
        userData &&
      <Wrapper1>
        <Image src = {userData?.img} />
        <Input type = 'text' placeholder = "Add a comment" value = {newComment} onChange={(e) => setNewComment(() => e.target.value)} />
        {(newComment.length > 0) && <Button onClick={handleAddComment}>
          <SendIcon />
        </Button>}
      </Wrapper1>
      }
      <Wrapper2>
        {comments && comments.map((comment) => (
          <SingleComment userId = {comment.userId} text = {comment.text} key = {comment._id} />
        ))}

      </Wrapper2>

    </Container>
  )
}

export default Comments