import axios from "axios";


function getProducts(){
    return axios.get("http://localhost:9090/products")
}

function getCategories(){
    return axios.get("http://localhost:9090/categories")
}

export default {
    getProducts:getProducts,
    getCategories:getCategories
}