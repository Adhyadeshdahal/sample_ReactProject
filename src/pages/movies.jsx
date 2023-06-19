import React from "react";
import { useParams,useNavigate } from "react-router-dom";

function MoviesPage(props) {
    const navigateTo = useNavigate();

    const params=useParams();
    return (<>
    <div>
        <h1>Movie id = {params.id}</h1>
        <button className="btn btn-primary" onClick={()=>{navigateTo("/")}}>Save</button>
    </div>
    
    </>  );
}

export default MoviesPage;