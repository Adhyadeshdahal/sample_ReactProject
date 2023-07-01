import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovie, saveMovie, updateMovie } from "../movies_Cart/services/movieService";
import AddNewMovieFormComponent from "../movies_Cart/components/addNewMovieFormComponent";
import { Validate } from "../movies_Cart/utils/validate";

function MoviesPage() {
  const navigateTo = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const [errors, setErrors] = useState({
    title: "",
    numberInStock: "",
    dailyRentalRate: "",
    genre: ""
  });
  const [activeId, setActiveId] = useState("");

  const fieldValues = useRef({
    title: "",
    numberInStock: "",
    dailyRentalRate: "",
    genreId: ""
  });
  const [initialValue,setInitialValue]=useState(fieldValues.current);

  useEffect(() => {
    async function getDetails() {
      try {
        const { data } = await getMovie(id);
        console.log(data);
        setMovie({ ...data });
      } catch (err) {
        console.log(err);
      }
    }

    getDetails();
  }, [id]);

  useEffect(() => {
    fieldValues.current = {
      title: movie.title || "",
      numberInStock: movie.numberInStock || "",
      dailyRentalRate: movie.dailyRentalRate || "",
      genreId: movie.genre ? movie.genre._id : ""
    };


    setInitialValue(fieldValues.current);
  }, [movie]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const error = Validate(fieldValues.current);
    if (error) {
      setErrors(error);
      console.log(error);
    } else {
      setErrors({ title: "", numberInStock: "", dailyRentalRate: "", genre: "" });

      async function settMovie() {
        try {
          await updateMovie({...fieldValues.current},movie._id);
          navigateTo("/");
        } catch (err) {
          console.log(err);
        }
      }

      settMovie();
    }
  };

  const handleClick = (event) => {
    setActiveId(event.currentTarget.id);
  };

  function handleChange(event) {
    const values = { ...fieldValues.current };

    setActiveId(event.currentTarget.id);
    values[event.currentTarget.id] = event.currentTarget.value;
    fieldValues.current = values;
    const error = Validate(fieldValues.current);
    if (error) {
      setErrors(error);
    } else {
      setIsDisabled(false);
      setErrors({ title: "", numberInStock: "", dailyRentalRate: "", genre: "" });
    }
  }

  const props = {
    fields: [
      {
        label: "Title",
        id: "title",
        placeholder: "Add Movie Title",
        type: "text"
      },
      {
        label: "Number In Stock",
        id: "numberInStock",
        placeholder: "6",
        type: "number"
      },
      {
        label: "Daily Rental Rate",
        id: "dailyRentalRate",
        placeholder: "2.5",
        type: "number"
      }
    ],
    genres: movie.genre ? [movie.genre] : [{ _id: "", name: "" }],
    forSubmit: handleSubmit,
    val: fieldValues.current,
    forChange: handleChange,
    error: errors,
    activeId: activeId,
    isDisabled: isDisabled,
    forClick: handleClick,
    repeatedMovie: null
  };

  return (
    <>
      <div>
        <h1>Movie id = {id}</h1>
        <AddNewMovieFormComponent {...props} />
        {/* <button className="btn btn-primary" onClick={() => {navigateTo("/")}}>Save</button> */}
      </div>
    </>
  );
}

export default MoviesPage;
