import React from 'react'
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const logoutHandler = ()=>{
        authService.logout()
        .then(()=>{
            dispatch(logout());
            navigate('/');
            
        })
    }
  return (
    <button
    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium cursor-pointer "
    onClick={logoutHandler}
    >
    Logout
    </button>
  )
}

export default Logout