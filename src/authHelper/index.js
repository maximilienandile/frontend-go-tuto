import firebase from "firebase/compat";
import "firebase/compat/auth";

function signout() {
    return firebase.auth().signOut()
}
function getCurrentUser(){
    return new Promise(function (resolve,reject) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user !== null){
                user.getIdToken().then((idToken) => {
                    resolve({
                        idToken:idToken,
                        originalUserObj: user
                    })
                }).catch((err)=>{
                    reject("impossible to get idToken: "+err)
                })
            } else {
                reject("no current user")
            }
        });
    })
}



export default {
    getCurrentUser:getCurrentUser,
    signout:signout,
}
