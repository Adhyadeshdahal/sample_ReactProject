import React, { useState,useEffect, useContext, createContext } from 'react';
import Main from "./nav/main" ;
import MainMovies from './movies_Cart/main';
import { Routes,Route } from 'react-router-dom';
import IndexMovies from './movies_Cart';
import Customers from './pages/customers';
import Rentals from './pages/rentals';
import NotFound from './pages/notFound';
import MoviesPage from './pages/movies';
import Login from './pages/Login/Login';
import Register from './pages/Register/register';
import AddNewMovie from './pages/addNewMovie';
import jwtDecode from 'jwt-decode';
import LogOut from './pages/LogOut';
import { useReducer } from 'react';
import Profile from './pages/profile';


export const userContext = createContext();




export function App() {
  const [navItems,setNavItems]=useState([
    { name: "movies", path: "/" },
    { name: "Customers", path: "customers" },
    { name: "rentals", path: "rentals" },
    { name: "Login", path: "login" },
    { name: "Register", path: "register" }
  ]
  );
  const [user,setUser]= useState({});
    useEffect(()=>{

    try{
      const jwt = localStorage.getItem('token');
      const decodedJwt = jwtDecode(jwt);
      setUser(decodedJwt);

    }catch(err){

    }
  },[]);

  useEffect(()=>{
    if(user._id){
      setNavItems([
        { name: "movies", path: "/" },
        { name: "Customers", path: "customers" },
        { name: "rentals", path: "rentals" },
        { name: user.name, path: `/profile/${user.name}` },
        { name: "Logout", path: "Logout" }
      ]
      )


    }


  },[user]);

  return (
    <> 
        <Main  navItems={navItems} logo={"Vidly"}/>

        <div>
        <Routes>
            <Route path="/" element={<userContext.Provider value={user}><IndexMovies/></userContext.Provider>}/>
            <Route path="/movies/:id" element={<MoviesPage/>}/>
            <Route path="/addNewMovie" element={<userContext.Provider value={user}><AddNewMovie/></userContext.Provider>}/>
            <Route path="/Customers" element={<Customers/>}/>
            <Route path="/Rentals" element={<Rentals/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/Logout" element={<LogOut/>}/>
            <Route path="/profile/:id" element={<Profile/>}/>
            <Route path="/*" element={<NotFound/>}/>
            


        </Routes>
            
        </div>
       

    </>
  )
}
