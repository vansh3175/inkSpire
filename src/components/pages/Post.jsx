import React,{useState,useEffect} from 'react'
import { useNavigate,Link,useParams, useFetcher } from 'react-router-dom'
import {Button,Container} from '../index'
import appWriteService from '../../appwrite/conf'
import parse from 'html-react-parser/lib/index'
import { useSelector } from 'react-redux'

function Post() {
    const [post,setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();
    const [file,setFile]=useState("");

    

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = (post&&userData)?post.userId===userData.$id:false;

    useEffect(()=>{
        if(slug){
            appWriteService.getPost(slug)
        .then(data=>{
            if(data) {
                setPost(data);
                
                appWriteService.getFile(data.featuredImage).then((res)=>{
                    
                    setFile(res)}
                );
            }
            else navigate('/');
        });
        }
        else{
            navigate('/');
        }

    },[slug,navigate]);




    const deletePost = () => {
        
        appWriteService.deletePost(post.$id).then((status) => {
            
            if (status) {
                
                appWriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };


  return post ? (
        <div className="py-8 mr-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative p-2">
                    <img
                        src={file}

                        alt={post.title}
                        className="rounded-xl w-full"


                    />
                    {isAuthor && (
                        <div className="absolute right-6 bottom-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button
                                    bgColor="bg-green-500"
                                    className="mr-2 px-4 py-2 rounded-md text-white font-medium shadow-sm hover:bg-green-600 transition-transform transform hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                                >
                                    Edit
                                </Button>
                                </Link>
                                <Button
                                bgColor="bg-red-500"
                                onClick={deletePost}
                                className="px-4 py-2 rounded-md text-white font-medium shadow-sm hover:bg-red-600 transition-transform transform hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                                >
                                Delete
                                </Button>

                        </div>
                    )}
                    
                    

                    
                </div>
                <div className="w-full mb-6 ml-2">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css ml-2">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}

export default Post