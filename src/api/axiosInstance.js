import axios from "axios";
import { base_url } from "./Api";


let axiosInstance = axios.create({
    baseURL: base_url
})

export default axiosInstance