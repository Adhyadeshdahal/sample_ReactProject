import React, { useEffect, useState } from 'react';
import { deleteMovie, getMovie, getMovies } from './services/fakeMovieServices';
import Pagnition from './components/pagnition';
import pagnitionUtils from './utils/pagnitionUtils';
import ComponentCpy from './components/componentcpy';
import { getGenres } from './services/fakeGenreService';
import ListGroup from './components/listGroup';
import listgroupUtils from './utils/listgroupUtils';
import { Heads } from './components/Heads';

export default function MainMovies() {
    const cmovies =getMovies();
    const ogenres= getGenres();
    let noOfItemsPerPage =4;
    const [fromPagnitionUtils,setfromPagnitionUtils] = useState(pagnitionUtils(cmovies,noOfItemsPerPage));
    let [movies,setMovies]=useState(fromPagnitionUtils.refactoredItems);
    let [wishList,setWish]=useState(0);
    let [currentPage,setCurrentPage]=useState(1);
    let [totalMovies,setTotalMovies]=useState(cmovies.length);
    let [selectedGenre,setSelectedGenre]=useState(null);

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
    

  <div className="d-flex justify-content-start">
  <div className='m-3'>
    <ListGroup genres={ogenres} forClick={handleListGroupClick} selectGenre={selectedGenre}/>
</div>
<br/>
  <div className='w-75 m-3'>
    <ComponentCpy onLiked={handleLike} handleClick={handleDelete} movies={movies}/>
  </div>
   </div>
    
  <div id="pagnition" className="">
   {fromPagnitionUtils.noOfPage>1?<Pagnition noOfPage={fromPagnitionUtils.noOfPage} forClick={handlePagnitionClick} currentPage={currentPage}/>:null};
    
  </div>
    



    
    
    </>
  )
}


