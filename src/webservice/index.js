import axios from "axios";


function getProducts(categoryId){
    return axios.get(process.env.VUE_APP_API_BASE_URL+"/products?categoryId="+categoryId)
}

function getCategories(){
    return axios.get(process.env.VUE_APP_API_BASE_URL+"/categories")
}

function getProductByID(productId){
    return axios.get(process.env.VUE_APP_API_BASE_URL+"/product/"+productId)
}

function addToCart(productId, delta, idToken){
    return axios.put(process.env.VUE_APP_API_BASE_URL+"/me/cart",{
        productId : productId,
        delta: delta
    },{
        headers : {
            'Authorization': `Bearer ${idToken}`
        }
    })
}

function getCart(idToken){
    return axios.get(process.env.VUE_APP_API_BASE_URL+"/me/cart",{
        headers : {
            'Authorization': `Bearer ${idToken}`
        }
    })
}

function checkout(idToken, provider, shippingCountryCode,currency){
    return axios.post(process.env.VUE_APP_API_BASE_URL+"/checkout",{
        provider : provider,
        shippingCountryCode: shippingCountryCode,
        currency: currency
    },{
        headers : {
            'Authorization': `Bearer ${idToken}`
        }
    })
}

export default {
    getProducts:getProducts,
    getCategories:getCategories,
    getProductByID:getProductByID,
    addToCart: addToCart,
    getCart:getCart,
    checkout:checkout,
}