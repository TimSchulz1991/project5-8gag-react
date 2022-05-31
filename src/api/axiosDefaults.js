import axios from "axios";

axios.defaults.baseURL = 'https://drf-api-8gag.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/formdata'
axios.defaults.withCredentials = true

export const axiosReq = axios.create();
export const axiosRes = axios.create();