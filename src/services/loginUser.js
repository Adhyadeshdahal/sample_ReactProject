import { authUrl } from "../config/config";
import axios from "axios";
import { getUserUrl } from "../config/config";

axios.defaults.headers.common['x-auth-token']=localStorage.getItem('token');

export function login(data){
    return axios.post(authUrl,data)
}

export function getUser(data){
    return axios.get(getUserUrl);
}