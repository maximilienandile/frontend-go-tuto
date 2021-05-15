import axios from "axios";


function getProducts(){
    return axios.get(process.env.VUE_APP_API_BASE_URL+"/products")
}

function getCategories(){
    return axios.get(process.env.VUE_APP_API_BASE_URL+"/categories")
}

function getProductByID(productId){
    return axios.get(process.env.VUE_APP_API_BASE_URL+"/product/"+productId)
}

function addToCart(productId, delta){
    return axios.put(process.env.VUE_APP_API_BASE_URL+"/me/cart",{
        productId : productId,
        delta: delta
    },{
        auth : {
            username:"maximilien",
            password: "1234"
        }
    })
}

export default {
    getProducts:getProducts,
    getCategories:getCategories,
    getProductByID:getProductByID,
    addToCart: addToCart
}