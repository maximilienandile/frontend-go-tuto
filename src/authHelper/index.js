
import firebase from "firebase/compat"
import "firebase/compat/auth"

function getCurrentUser(){
    return new Promise(function (resolve, reject){
        firebase.auth().onAuthStateChanged((user)=>{
            if (user !== null){
                // we have a connected user
                user.getIdToken().then((idToken)=>{
                    resolve({
                        idToken:idToken,
                        originalUserObj : user
                    })
                }).catch((err)=>{
                    reject("impossible to get idToken: "+err)
                })
            } else {
                reject("no user connected")
            }
        })
    })
}

export default {
    getCurrentUser:getCurrentUser
}