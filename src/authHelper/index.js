import firebase from "firebase/compat";
import "firebase/compat/auth";

function signout() {
    return firebase.auth().signOut()
}
function getCurrentUser(){
    return new Promise(function (resolve) {
        firebase.auth().onAuthStateChanged((user) => {
            resolve(user)
        });
    })
}

function getCurrentUserOrCreateAnonymous() {
    return new Promise(function (resolve, reject) {
        if (firebase.auth().currentUser === null) {
            console.log("no current user, create anonymous")
            // create anonymous
            firebase.auth().signInAnonymously().then(() => {
                console.log("signInAnonymously")
                firebase.auth().currentUser.getIdToken().then((idToken) => {
                    console.log("retrieved id token of anonymous")
                    resolve(
                        {
                            idToken: idToken,
                            isAnonymous: true
                        }
                    )
                }).catch((error) => {
                    reject(
                        {
                            originalError: error,
                            message: "impossible to retrieve id token of current anonymous user"
                        }
                    )
                });
            }).catch((error) => {
                reject({
                    originalError: error,
                    message: "impossible to signIn anonymously"
                })
            });
        } else {
            // one current user, retrieve id token
            firebase.auth().currentUser.getIdToken().then((idToken) => {
                resolve(
                    {
                        idToken: idToken,
                        isAnonymous: firebase.auth().currentUser.isAnonymous
                    }
                )
            }).catch(function (error) {
                reject(
                    {
                        originalError: error,
                        message: "impossible to retrieve idToken of current non-anon user"
                    }
                )
            });
        }
    })
}


export default {
    getCurrentUserOrCreateAnonymous: getCurrentUserOrCreateAnonymous,
    getCurrentUser:getCurrentUser,
    signout:signout,
}
