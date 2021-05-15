<template>
  <NavBar></NavBar>
  <div id='firebaseui-auth-container'></div>
</template>

<script>


import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import * as firebaseui from 'firebaseui'
import NavBar from "../components/NavBar";
require("firebaseui/dist/firebaseui.css");

export default {
  name: "Login",
  components: {NavBar},
  mounted() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
// retain reference to the anonymous user
      let anonymousUser = firebase.auth().currentUser
      const uiConfig = {
        callbacks: {
          signInFailure: function(error) {
            console.error(error)
            // For merge conflicts, the error.code will be
            // 'firebaseui/anonymous-upgrade-merge-conflict'.
            if (error.code !== 'firebaseui/anonymous-upgrade-merge-conflict') {
              return Promise.resolve();
            }
            // The credential the user tried to sign in with.
            let cred = error.credential;
            // delete anonymous
            anonymousUser.delete().then(()=> {
              firebase.auth().signInWithCredential(cred).then(()=>{
                console.log("ok signin with creds")
                window.location.assign('/');
              }).catch((err)=>{
                console.log("impossible to signing with cred")
                console.error(err)
              })
            }).catch((err)=>{
              console.log("impossible to remove anonymous user")
              console.error(err)
            })
          }

        },
        autoUpgradeAnonymousUsers: true,
        signInFlow: 'redirect',
        signInSuccessUrl: '/',
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        tosUrl: 'https://example.com',
        privacyPolicyUrl: 'https://example.com'
      };

      if(firebaseui.auth.AuthUI.getInstance()) {
        const ui = firebaseui.auth.AuthUI.getInstance()
        ui.start('#firebaseui-auth-container', uiConfig)
      } else {
        const ui = new firebaseui.auth.AuthUI(firebase.auth())
        ui.start('#firebaseui-auth-container', uiConfig)
      }
    }).catch((error) => {
      // Handle Errors here.
      console.error(error)
    });

  },
}
</script>

<style scoped>

</style>