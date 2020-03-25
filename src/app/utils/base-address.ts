import Axios from "axios";
export const apiBaseAddress = "https://127.0.0.1:3000/api/";
export const axios = Axios.create({
    baseURL: apiBaseAddress
});
