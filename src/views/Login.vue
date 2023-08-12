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
      const uiConfig = {
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
  },
}
</script>

<style scoped>

</style>