import axios from "axios";
const url ="http://127.0.0.1:3900/api/movies";
export function ggetMovies(){
return axios.get(url);


};
export async function getMovie(id) {
    return axios.get(url+"/"+id);
};

export async function saveMovie(movie){

    return axios.post(url,movie);
}

export function updateMovie(movie,_id){
    return axios.put(url+"/"+_id,movie)
}
