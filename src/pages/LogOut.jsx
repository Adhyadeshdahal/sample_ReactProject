import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


function LogOut() {
    const navigateTo = useNavigate();
    

    useEffect(()=>{
        localStorage.removeItem('token');
        window.location.href = "/";
        

    })
  return (
    <div>LogOut</div>
  )
}

export default LogOut