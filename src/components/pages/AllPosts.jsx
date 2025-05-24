import React, { useState, useEffect } from 'react'
import { PostCard } from '../index'
import appwriteService from '../../appwrite/conf'
import{ Container} from '../index'

function AllPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts([]).then((data) => {
      if (data) {
        setPosts(data.documents)
      }
    })
  }, [])

  return (
    (posts.length>0) ? (<div className="w-full py-8 px-8 ml-15">
        <h1 className='mb-8 text-5xl font-bold py-3'>Explore the World of Words</h1>
      <div className="flex flex-wrap gap-12 ">
        {posts.map((post) => (
          <div
            key={post.$id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
          >
            <PostCard {...post} />
          </div>
        ))}
      </div>
      
    </div>
  ):(<div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                        No Posts
                    </h1>
                </Container>
            </div>
            )
)
}

export default AllPosts
