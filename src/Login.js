import React, { useEffect } from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('user-info'))
    {
     navigate('/add');
    }
   
    
   }, [])
   

  return (
    <>
    <Header/>
    <div>Login</div>
    </>
    )
}
