<template>
  <div id='firebaseui-auth-container'></div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import * as firebaseui from 'firebaseui'
require("firebaseui/dist/firebaseui.css");

export default {
  name: "Login",
  mounted() {
    const uiConfig = {
      signInFlow: 'popup',
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
  },
}
</script>

<style scoped>

</style>