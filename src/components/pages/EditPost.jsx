import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../index'
import appwriteService from "../../appwrite/conf";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {


    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug)
            .then((data)=>{
                if(data) setPost(data);
            })
        }
        else{
            navigate('/');
        }
    },[slug,navigate]);

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost