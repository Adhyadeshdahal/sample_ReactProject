import axios from "axios";
import { genreUrl } from "../../config/config";

axios.defaults.headers.common['x-auth-token']=localStorage.getItem('token');
export function getGenres() {
return axios.get(genreUrl);
}