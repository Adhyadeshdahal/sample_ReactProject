import axios from "axios";
const url = "http://localhost:3900/api/genres";


export function getGenres() {
return axios.get(url);
}