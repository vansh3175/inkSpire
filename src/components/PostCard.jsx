import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import appWriteService from '../appwrite/conf'

function PostCard({ title, $id, featuredImage }) {
  const [file, setFile] = useState("")

  useEffect(() => {
    appWriteService.getFile(featuredImage).then((res) => {
      setFile(res)
    })
  }, [featuredImage])

  return (
    <Link to={`/post/${$id}`} className="block w-full max-w-sm ">
      <div className="rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
        {/* Image section */}
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          {file ? (
            <img
              src={file}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400">Loading...</span>
          )}
        </div>

        {/* Title section */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
