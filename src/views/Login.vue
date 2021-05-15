<template>
  <NavBar></NavBar>
  <div id="firebaseui-auth-container"></div>

</template>

<script>
import NavBar from "../components/NavBar";
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import * as firebaseui from "firebaseui"
require("firebaseui/dist/firebaseui.css")

export default {
  name: "Login",
  components: {NavBar},
  mounted(){
    const uiConfig = {
      signInFlow: "redirect",
      signInSuccessUrl : "/",
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
    };
    let firebaseUiInstance = firebaseui.auth.AuthUI.getInstance()
    if (firebaseUiInstance) {
      firebaseUiInstance.start("#firebaseui-auth-container",uiConfig)
    } else {
      const ui = new firebaseui.auth.AuthUI(firebase.auth())
      ui.start("#firebaseui-auth-container",uiConfig)
    }



  }
}
</script>

<style scoped>

</style>