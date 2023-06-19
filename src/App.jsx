import React from 'react';
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


export default function App() {
  return (
    <>
        <Main  navItems={["movies","Customers","rentals","Login","Register"]} logo={"Vidly"}/>

        <div>
        <Routes>
            <Route path="/" element={<IndexMovies/>}/>
            <Route path="/movies/:id" element={<MoviesPage/>}/>

            <Route path="/Customers" element={<Customers/>}/>
            <Route path="/Rentals" element={<Rentals/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/*" element={<NotFound/>}/>
            


        </Routes>
            
        </div>
       

    </>
  )
}
