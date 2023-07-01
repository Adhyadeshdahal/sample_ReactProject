import axios from "axios";
import { movieUrl } from "../../config/config";

axios.defaults.headers.common['x-auth-token']=localStorage.getItem('token');

export function ggetMovies(){
return axios.get(movieUrl);


};
export async function getMovie(id) {
    return axios.get(movieUrl+"/"+id);
};

export async function saveMovie(movie){

    return axios.post(movieUrl,movie);
}

export function updateMovie(movie,_id){
    return axios.put(movieUrl+"/"+_id,movie)
}

export async function deleteMovie(id) {
    return axios.delete(movieUrl+"/"+id)
    
}