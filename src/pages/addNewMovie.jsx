import React, { useContext, useEffect, useState,useRef } from 'react';
import AddNewMovieFormComponent from '../movies_Cart/components/addNewMovieFormComponent';
import { getGenres } from '../movies_Cart/services/fakeGenreService';
import Joi from 'joi';
import { saveMovie, searchMovie } from '../movies_Cart/services/fakeMovieServices';
import { useNavigate } from 'react-router-dom';

function AddNewMovie() {
  const navigateTo= useNavigate();
  const [activeId,setActiveId]=useState("");
  const [isDisabled,setIsDisabled]=useState(true);
  const [genres,setGenres]=useState(getGenres());
  const [errors,setErrors]=useState({title:"",stock:"",rate:"",genre:""});
  const [doesMovieExist,setDoesMovieExists]=useState(false);
  const [fields,setFields]=useState([
    {
      label:"Title",
      id:"title",
      placeholder:"Add Movie Title",
      type:"Text"
    },
    {
      label:"Number In Stock",
      id:"stock",
      placeholder:"6",
      type:"number"
    },
    {
      label:"Rate",
      id:"rate",
      placeholder:"2.5",
      type:"number"
    }
  ]);
  const fieldValues =useRef({
    title:"",
    stock:"",
    rate:"",
    genre:""
  });
  const schema = Joi.object(
    {
        title:Joi.string().required().max(30).min(1).alphanum(),
        stock:Joi.number().required().min(1),
        rate:Joi.number().required().min(1).max(11),
        genre:Joi.string().required()

    }
    )
    .options({abortEarly:false});

    

function Validate() {

  const schema = Joi.object(
      {
          title:Joi.string().required().max(30).min(3).regex(/^[a-zA-Z0-9\s]*$/).allow(''),
          stock:Joi.number().required().min(1),
          rate:Joi.number().required().min(1).max(11),
          genre:Joi.string().required()

      }
      )
      .options({abortEarly:false});

  const {error}= schema.validate(fieldValues.current);

  let err ={title:"",stock:"",rate:"",genre:""};

  if (error) {
    error.details.forEach(e => {
      const message = e.message;

      if (e.path[0] === "title") {
        err["title"] = message;
      } else if (e.path[0] === "stock") {
        err["stock"] = message;
      } else if (e.path[0] === "rate") {
        err["rate"] = message;
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
    setErrors({title:"",stock:"",rate:"",genre:""})
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
    setErrors({ title: "", stock: "", rate: "", genre: "" });

    setTimeout(() => {
      const movieExists = searchMovie(fieldValues.current.title);

      setDoesMovieExists(movieExists);
      if (!movieExists) {
        saveMovie(fieldValues.current);
        navigateTo("/");

      }
    }, 0);
  }
};





  return (
    <AddNewMovieFormComponent genres={genres} fields={fields} error={errors}
    forSubmit={handleSubmit} val={fieldValues} forChange={handleChange} activeId={activeId} isDisabled={isDisabled}
    forClick={handleClick} repeatedMovie={doesMovieExist}/>
  )
}

export default AddNewMovie;