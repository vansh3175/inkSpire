import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { BrowserRouter,createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/pages/Home.jsx'
import { AuthLayout } from './components/index.js'
import Login from './components/pages/Login.jsx'
import Signup from './components/pages/Signup.jsx'
import EditPost from './components/pages/EditPost.jsx'
import Post from './components/pages/Post.jsx'
import AllPosts from './components/pages/AllPosts.jsx'
import AddPost from './components/pages/AddPost.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'login',
        element:(
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
         path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
      },
      {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AddPost/>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={store} >
      <RouterProvider router={router}/>
    </Provider>
    
    
  </StrictMode>,
)
