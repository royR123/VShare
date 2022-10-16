import React , { useEffect, useState } from 'react'
import styled from 'styled-components'
import app from '../config/firebase'
import { useSelector } from 'react-redux'

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import axios from 'axios'

const Container = styled.div`
    position : absolute;
    top:0px;
    left : 0px;
    width:100vw;
    height:100vh;
    background-color: rgba(85, 82, 82, 0.778);
    
    `
const Closebtn = styled.button`
        background-color : inherit;
        color : red;
        border:none;
        font-weight: bolder;
        cursor: pointer;
        &:hover{
            text-shadow: 3px 3px 6px red;
        }
    `
const Wrapper = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
`
const Heading = styled.h2`
    text-shadow: 5px 5px 10px ${({ theme }) => theme.bg};
    margin: auto;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 75vw;
    margin:auto;

    
`
const Input = styled.input`
    width: 70%;
    margin: auto;
    background-color: ${({theme}) => theme.bg};
    color: ${({theme}) => theme.text};
    border: none;
    height: 21px;
    padding: 10px;
    font-weight : bold;
    /* font-weight : 20px; */
    border-radius: 3px;
    margin-bottom: 5px;
    
    &:hover{
        box-shadow: 0.6px 0.2px 5px ${({theme}) => theme.bg};
    }
    
    `
const About = styled.textarea`
    width: 70%;
    margin: auto;
    background-color: ${({theme}) => theme.bg};
    font-weight : bold;
    color: ${({theme}) => theme.text};
    border: none;
    padding: 10px;
    border-radius: 3px;
    margin-bottom: 5px;
    &:hover{
        box-shadow: 0.6px 0.2px 5px ${({theme}) => theme.bg};
    }
    
    `
const Button = styled.div`
    width: 70%;
    margin: auto;
    background-color: ${({theme}) => theme.bg}; 
    font-weight : 500;
    color: ${({theme}) => theme.text};
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 3px;
    margin-bottom: 5px;
    &:hover{
        box-shadow: 0.6px 0.2px 5px ${({theme}) => theme.bg};
    }
    &:active{
        border-bottom: 2px solid ${({theme}) => theme.text};
    }  
    text-align: center;
    
    `
const Label = styled.label`
    width: 70%;
    margin: auto;
    background-color: ${({theme}) => theme.bg};
    font-weight : bold;
    color: ${({theme}) => theme.text};
    border: none;
    padding: 10px;
    border-radius: 3px;
    margin-bottom: 5px;

`

const UploadVideo = ({ setUploadVideoClicked }) => {
    const [img,setImg] = useState(null);
    const [video,setVideo] = useState(null);
    const [title,setTitle] = useState(null);
    const [about,setAbout] = useState(null);
    const [tags,setTags] = useState(null);
    const [videoUrl,setVideoUrl] = useState(null);
    const [imgUrl,setImgUrl] = useState(null);
    const [filename,setFilename] = useState(null);

    const {userData} = useSelector(state => state.user)


    const uploadFile = (file,urlType) => {
        const storage = getStorage(app);
        setFilename(() => new Date().getTime() + file.name)
        const storageRef = ref(storage,new Date().getTime() + file.name );
        const uploadTask = uploadBytesResumable(storageRef, file);

        
        uploadTask.on('state_changed', 
          (snapshot) => {
            
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            console.log(error);
          }, 
          () => {
           
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              if(urlType == 'video'){
                setVideoUrl(() => downloadURL);
              }else{
                setImgUrl(() => downloadURL);
              }
            });
          }
        );

    }
    const handleUpload = (e) => {
        e.preventDefault();
        if(!title || !tags || !videoUrl || !imgUrl || !about)return;
        const response = axios.post(`/video/add/${userData.userId}`,{
            videoUrl : videoUrl,
            imgUrl : imgUrl,
            title:title,
            description:about,
            tags:tags,
            videoFilename : filename
        })
        if(response.status == 200){

        }else{

        }
        console.log(response.data);
    }

    useEffect(()=>{
        video && uploadFile(video,"video")
    },[video])

    useEffect(()=>{
        img && uploadFile(img,"img")
    },[img])

    return (
        <Container>
            <Wrapper>
                <Heading>Upload Video</Heading>
                <Closebtn onClick={() => setUploadVideoClicked(() => false)}>X</Closebtn>
            </Wrapper>

            <Form>
                <Label>Select the video</Label>
                <Input type= "file" accept='video/*' onChange={(e) => {setVideo(() => e.target.files[0])}} />
                <Input type='text' placeholder='Title*' onChange={(e) => {setTitle(() => e.target.value)}} />
                <About placeholder='About the video*' rows={6} onChange={(e) => {setAbout(() => e.target.value)}} />
                <Input type='text' placeholder='tags separated by commas*' onChange={(e) => {setTags(() => e.target.value.split(","))}} />
                <Label>Select the Thumbnail</Label>
                <Input type='file' accept='image/*' onChange={(e) => {setImg(() => e.target.files[0])}} />
                <Button onClick={handleUpload} >  Submit  </Button>
                
                
            </Form>

        </Container>
    )
}

export default UploadVideo