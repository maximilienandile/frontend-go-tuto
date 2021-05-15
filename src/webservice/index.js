import axios from "axios";


function getProducts(){
    return axios.get(process.env.VUE_APP_API_BASE_URL+"/products")
}

function getCategories(){
    return axios.get(process.env.VUE_APP_API_BASE_URL+"/categories")
}

export default {
    getProducts:getProducts,
    getCategories:getCategories
}