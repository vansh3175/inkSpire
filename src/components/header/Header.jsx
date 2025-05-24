import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Logout,Container,Logo} from "../index"
import { useNavigate } from 'react-router-dom';


function Header() {
  const isLoggedIn = useSelector((state)=>(state.auth.status))
  const navigate = useNavigate();
  const navItems = [
    {
      name:"Home",
      root:"/",
      active:true

    },
    {
      name:"Login",
      root:"/login",
      active:!isLoggedIn

    },
    {
      name:"Signup",
      root:"/signup",
      active:!isLoggedIn

    },
    {
      name:"All Posts",
      root:"/all-posts",
      active:isLoggedIn

    },
    {
      name:"Add Post",
      root:"/add-post",
      active:isLoggedIn

    },

  ]
  return (
  <header className="bg-white shadow-md w-full z-100 ">
  <nav className="flex items-center justify-between py-4 px-6 w-full">
    
    <div className="flex-shrink-0">
      <Link to="/">
        <Logo />
      </Link>
    </div>

    
    <ul className="flex items-center gap-6">
      {navItems.map(
        (item) =>
          item.active && (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.root)}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium cursor-pointer"
              >
                {item.name}
              </button>
            </li>
          )
      )}

      
      {isLoggedIn && (
        <li className='cursor-pointer'>
          <Logout />
        </li>
      )}
    </ul>
  </nav>
</header>


  )
}

export default Header;