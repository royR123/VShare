
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import app from '../config/firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import axios from '../utils/axios'
import { loginSuccess } from '../redux/userSlice'
import AlertMessage from '../components/AlertMessage'


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* width: 60vw; */

`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Input = styled.input`
    height: 30px;
    margin-top :10px;
    border: none;
    border-radius:5px;
`

const Label = styled.label`
    margin-top :10px;
    
`

const Wrapper = styled.div`
    height: 30px;
    margin-top :10px;
    border: none;
    border-radius:5px;
    display: flex;
    gap : 0.7rem ;
    justify-content:space-between ;
`
const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin : auto;
    background-color: ${({theme}) => theme.text};
    color: ${({theme}) => theme.bg};
    border-radius : 5px;
    font-weight : bolder ;
    cursor: pointer;
    padding: 5px;
    width: 50%;
    height: 35px;
    &:hover{
        box-shadow: 2px 2px 10px ${({theme}) => theme.text};
    }
    &:active{
        padding: 4px;
    }
`
const FlashMessage = styled.div`
    margin-top: 20px;
`

const UserProfile = () => {
    const { userData } = useSelector((state) => state.user)
    const [name,setName] = useState(userData.name);
    const [email,setEmail] = useState(userData.email);
    const [imgUrl,setImgUrl] = useState(null);
    const [img,setImg] = useState(null);
    const [filename,setFilename] = useState(null);
    const [statusUpload,setStatusUpload] = useState(false);
    const [type,setType] = useState(0);
    const [perc,setPerc] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChangePassword = () => {
        navigate('/user/changePassword');
    }
    const handleVideos = () => {
        navigate('/user/yourVideos');

    }
    // let progress ;
    const uploadFile = (file) => {
        const storage = getStorage(app);
        setFilename(() => new Date().getTime() + file.name)
        const storageRef = ref(storage,new Date().getTime() + file.name );
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', 
          (snapshot) => {
            
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setPerc(() => Math.round(progress));
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
              setImgUrl(() => downloadURL);
            });
          }
        );

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers : {
                "authorisation" : `Bearer ${userData?.token}`
            }
        }
        try {
            
            const response = await axios.put(`/user/update/${userData.userId}`,{
                name : name,
                email : email,
                img : imgUrl
            },config)
            dispatch(loginSuccess({...response.data,token : userData.token}));
            if(response.status == 200){
                setType(1);
            }
        } catch (error) {
            
        }
        setStatusUpload(true);
        setTimeout(() => {
            setStatusUpload(() => false)
        }, 3000);
    }
    useEffect(() => {
       img && uploadFile(img);
    },[img])
    return (
        <Container>
            <Form >
                <Input type = 'text' value={name} onChange = {(e) => {
                    setName(() => e.target.value)
                }} />
                <Input type = 'email' value={email} onChange = {(e) => {
                    setEmail(() => e.target.value)
                }} />
                <Label>Profile Picture</Label>
                <Input type = 'file' accept='image/*' onChange={(e) => {setImg(() => e.target.files[0])}}  />
                {(perc > 0 && perc < 100) && <Label>{perc + '%'}</Label>}
                <Button onClick={handleSubmit} >Update</Button>
            </Form>
            <Wrapper>
                <Button onClick={handleChangePassword}>Change Password</Button>
                <Button onClick={handleVideos} >Your Videos</Button>
            </Wrapper>
            {statusUpload && 
            <FlashMessage>
                <AlertMessage type = {type}/>
            </FlashMessage>
            }
        </Container>
    )
}

export default UserProfile;