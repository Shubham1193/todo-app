import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const HomeScreen = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token){
            navigate("/signin")
        }
        else{
            navigate("/todos")
        }
    })
  return (
    <div>HomeScreen</div>
  )
}

export default HomeScreen