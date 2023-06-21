import React, {useRef, useState } from 'react';
import { deleteMovie, getMovie, getMovies } from './services/fakeMovieServices';
import Pagnition from './components/pagnition';
import pagnitionUtils from './utils/pagnitionUtils';
import ComponentCpy from './components/componentcpy';
import { getGenres } from './services/fakeGenreService';
import ListGroup from './components/listGroup';
import listgroupUtils from './utils/listgroupUtils';
import { Heads } from './components/Heads';
import { useNavigate } from 'react-router-dom';



export default function MainMovies() {
    const navigateTo = useNavigate();
    const [cmovies,setCMovies] = useState(getMovies());
    const [ogenres,setOGenres]= useState(getGenres());
    let noOfItemsPerPage =4;
    const [fromPagnitionUtils,setfromPagnitionUtils] = useState(pagnitionUtils(cmovies,noOfItemsPerPage));
    let [movies,setMovies]=useState(fromPagnitionUtils.refactoredItems);
    let [wishList,setWish]=useState(0);
    let [currentPage,setCurrentPage]=useState(1);
    let [totalMovies,setTotalMovies]=useState(cmovies.length);
    let [selectedGenre,setSelectedGenre]=useState(null);
    const searchedValue = useRef("");

    function sortMovies(type) {
      var sortedMovies ;
      if (type==="title"){
        sortedMovies =[...movies].sort((a, b) => a[type].localeCompare(b[type]));
      }else if (type === "numberInStock"){
        sortedMovies = [...movies].sort((a, b) => a[type]-b[type]);
      }
      
      setMovies(sortedMovies);
      console.log(sortedMovies);
    }
    

    function searchMovies() {
      const filteredMovies= cmovies.filter(movie => {return movie.title.toLowerCase().includes(searchedValue.current)}).
      sort((a, b) => a.title.localeCompare(b.title));
      setMovies (filteredMovies);

      
    }


    function handleChange(event){
      setSelectedGenre(null);
      searchedValue.current = event.currentTarget.value.toLowerCase();
      searchMovies();
      console.log(searchedValue.current);


    }

    const handleListGroupClick=(id)=>{
      if(id){
      let fromListGroupUtils= listgroupUtils(cmovies,id);
     const changeStates=()=>{
      setfromPagnitionUtils(pagnitionUtils(fromListGroupUtils.refactoredItems,noOfItemsPerPage));
      setMovies(pagnitionUtils(fromListGroupUtils.refactoredItems,noOfItemsPerPage).refactoredItems);
      setTotalMovies(fromListGroupUtils.refactoredItems.length);
      setSelectedGenre(id);
    };

    changeStates();
  }else{
    setfromPagnitionUtils(pagnitionUtils(cmovies,noOfItemsPerPage));
    setMovies(pagnitionUtils(cmovies,noOfItemsPerPage).refactoredItems);
    setTotalMovies(cmovies.length);
    setSelectedGenre(null);


  }
      


    }

    const handlePagnitionClick =(startIndex)=>{
      setMovies(pagnitionUtils(cmovies,noOfItemsPerPage,startIndex*noOfItemsPerPage).refactoredItems);
      setCurrentPage(startIndex+1);



    }

    const handleLike =(ifLiked)=>{
      if(ifLiked){
        setWish(wishList+1);
      }else if (!ifLiked){
        if (wishList>0) {
          setWish(wishList-1);
        }
        // wishlist>=0?setWish(wishList-1):nu;
      }
    }
    
   const handleDelete=(id)=>{
    let index = movies.indexOf(getMovie(id));
    if (index !== -1){
        let movieTemp = movies.filter(obj => {return obj._id != id})
        setMovies(movieTemp);
        setTotalMovies(totalMovies-1)
        handleLike(false);
        

    }
   }





  return (
    <>


    {Heads(movies, totalMovies, wishList)}
    
    <input type="search" name="search" placeholder='Search...' onChange ={handleChange}/>
  <div className='m-3'>

  <div className="d-flex justify-content-start">
    <ListGroup genres={ogenres} forClick={handleListGroupClick} selectGenre={selectedGenre}/>
</div>
<br/>
  <div className='w-75 m-3'>
    <ComponentCpy onLiked={handleLike} handleClick={handleDelete} movies={movies} forSort ={sortMovies}/>

    <button className='btn btn-primary' onClick={()=>{navigateTo("/addNewMovie")}}>New Movie</button>
    
    

  </div>
   </div>
    
  <div id="pagnition" className="">
   {fromPagnitionUtils.noOfPage>1?<Pagnition noOfPage={fromPagnitionUtils.noOfPage} forClick={handlePagnitionClick} currentPage={currentPage}/>:null};
    
  </div>
    



    
    
    </>
  )
}


