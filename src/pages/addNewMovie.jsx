import React, { useContext, useEffect, useState,useRef } from 'react';
import AddNewMovieFormComponent from '../movies_Cart/components/addNewMovieFormComponent';
import { getGenres } from '../movies_Cart/services/genreService';
import { saveMovie } from '../movies_Cart/services/movieService';
import Joi from 'joi';
// import { saveMovie, searchMovie } from '../movies_Cart/services/fakeMovieServices';
import { useNavigate } from 'react-router-dom';

function AddNewMovie() {
  const navigateTo= useNavigate();
  const [activeId,setActiveId]=useState("");
  const [isDisabled,setIsDisabled]=useState(true);
  const [genres,setGenres]=useState([]);
  const [errors,setErrors]=useState({title:"",numberInStock:"",dailyRentalRate:"",genre:""});
  const [doesMovieExist,setDoesMovieExists]=useState(false);
  useEffect(()=>{
    async function getVal(){
      const {data:genre}= await getGenres();
      setGenres(genre);
    }
    getVal();


  },[]);
  const [fields,setFields]=useState([
    {
      label:"Title",
      id:"title",
      placeholder:"Add Movie Title",
      type:"Text"
    },
    {
      label:"Number In numberInStock",
      id:"numberInStock",
      placeholder:"6",
      type:"number"
    },
    {
      label:"dailyRentalRate",
      id:"dailyRentalRate",
      placeholder:"2.5",
      type:"number"
    }
  ]);
  const fieldValues =useRef({
    title:"",
    numberInStock:"",
    dailyRentalRate:"",
    genreId:""
  });
  const schema = Joi.object(
    {
        title:Joi.string().required().max(30).min(1).alphanum(),
        numberInStock:Joi.number().required().min(1),
        dailyRentalRate:Joi.number().required().min(1).max(11),
        genreId:Joi.required()

    }
    )
    .options({abortEarly:false});

    

function Validate() {

  const schema = Joi.object(
      {
          title:Joi.string().required().max(30).min(3).regex(/^[a-zA-Z0-9\s]*$/).allow(''),
          numberInStock:Joi.number().required().min(1),
          dailyRentalRate:Joi.number().required().min(1).max(11),
          genreId:Joi.required()

      }
      )
      .options({abortEarly:false});

  const {error}= schema.validate(fieldValues.current);

  let err ={title:"",numberInStock:"",dailyRentalRate:"",genre:""};

  if (error) {
    error.details.forEach(e => {
      const message = e.message;

      if (e.path[0] === "title") {
        err["title"] = message;
      } else if (e.path[0] === "numberInStock") {
        err["numberInStock"] = message;
      } else if (e.path[0] === "dailyRentalRate") {
        err["dailyRentalRate"] = message;
      }
      else if (e.path[0] === "genre") {
        err["genre"] = message;
      }
    });
  }else{
    err= null;
  }
    setIsDisabled(!!error);
      return err;
 


   }
   
   
   function handleChange(event) {
    const values ={...fieldValues.current};
    values[event.currentTarget.id]=event.currentTarget.value;
    setActiveId(event.currentTarget.id);
   fieldValues.current = values;
   const error= Validate();
   if (error){
   setErrors(error)
  }else{
    setErrors({title:"",numberInStock:"",dailyRentalRate:"",genre:""})
  };

   
}
const handleClick=(event)=>{
  setActiveId(event.currentTarget.id);

}
  
const handleSubmit = (event) => {
  event.preventDefault();

  const error = Validate();
  if (error) {
    setErrors(error);
  } else {
    setErrors({ title: "", numberInStock: "", dailyRentalRate: "", genre: "" });

    async function setMovie() {

      try{
       await saveMovie({...fieldValues.current});
       navigateTo("/");

      }catch(err){
        console.log(err);
      }

      


      
    }

    setMovie();









    // setTimeout(() => {
    //   const movieExists = searchMovie(fieldValues.current.title);

    //   setDoesMovieExists(movieExists);
    //   if (!movieExists) {
    //     saveMovie(fieldValues.current);
    //     navigateTo("/");

    //   }
    // }, 0);
  }
};





  return (
    
    <AddNewMovieFormComponent genres={genres} fields={fields} error={errors}
    forSubmit={handleSubmit} val={fieldValues} forChange={handleChange} activeId={activeId} isDisabled={isDisabled}
    forClick={handleClick} repeatedMovie={doesMovieExist} initialValue={fieldValues}/>
  )
}

export default AddNewMovie;