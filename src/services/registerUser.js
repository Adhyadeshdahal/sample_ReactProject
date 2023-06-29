import axios from "axios";
import { userUrl } from "../config/config";

export function saveUser(user){
    return axios.post(userUrl,user);



}