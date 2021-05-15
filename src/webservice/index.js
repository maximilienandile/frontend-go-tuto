import axios from "axios";


function getProducts(){
    return axios.get("http://localhost:9090/products")
}

export default {
    getProducts:getProducts
}