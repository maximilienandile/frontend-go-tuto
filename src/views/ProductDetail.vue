<template>
  <NavBar></NavBar>
  <Loader v-if="loading"></Loader>
  <div v-else class="row">
    <div class="col">
      <img :src="product.image" :alt="product.name">
    </div>
    <div class="col">
      <h1>{{ product.name }}</h1>
      <p>{{ product.totalPrice.display }}</p>
      <p>{{ product.shortDescription }}</p>
      <button @click="onAddToCart" type="button" class="btn btn-success">Add to Cart</button>
      <div class="alert alert-primary mt-3" role="alert" v-if="showLoginAlert">
        Please Sign-in to add to cart...
      </div>
      <div class="alert alert-danger mt-3" role="alert" v-if="showError">
        An error occurred: {{ errorMessage}}
      </div>
      <div class="alert alert-success mt-3" role="alert" v-if="showSuccess">
        {{ successMessage }}
      </div>
      <div id='firebaseui-auth-container'></div>

    </div>
  </div>

</template>

<script>
import NavBar from "../components/NavBar";
import Webservice from "../webservice";
import Loader from "../components/Loader";
import "firebase/compat/auth";
import AuthHelper from "../authHelper";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import * as firebaseui from 'firebaseui'

export default {
  name: "ProductDetail",
  components: {Loader, NavBar},
  props: {
    productId: String
  },
  data() {
    return {
      errorMessage : "",
      showError : false,
      showSuccess : false,
      successMessage : "",
      showLoginModal : false,
      showLoginAlert:false,
      product: null,
      loading: false,
    }
  },
  created() {
    this.loading = true
    Webservice.getProductByID(this.productId).then((res) => {
      this.product = res.data
      this.loading = false
    }).catch((err) => {
      alert(err)
      this.loading = false
    })
  },
  methods: {
    onAddToCart() {
      AuthHelper.getCurrentUser().then((user)=> {
        Webservice.addToCart(this.productId, 1, user.idToken).then(() => {
          this.successMessage = "Object added to your cart"
          this.showSuccess = true
        }).catch((err) => {
          this.errorMessage = "Impossible to add to cart"
          this.showError = true
          console.error( err)
        })
      }).catch(()=>{
        // no current user we have to ask the user to login/signup
        this.showLoginAlert = true
        this.loginPopup()
      })
    },
    loginPopup(){
      const uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: (authResult) => {
            console.log(authResult)
            // when sign in is a success
            Webservice.addToCart(this.productId, 1, authResult.credential.idToken).then((res) => {
              console.log("OK addToCart" + res)
              this.showLoginAlert = false
            }).catch((err) => {
              console.log("impossible to add to cart" + err)
            })
            // do not redirect the user
            return false;
          },
        },
        signInFlow: 'popup',
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
      };
      if(firebaseui.auth.AuthUI.getInstance()) {
        const ui = firebaseui.auth.AuthUI.getInstance()
        ui.start('#firebaseui-auth-container', uiConfig)
      } else {
        const ui = new firebaseui.auth.AuthUI(firebase.auth())
        ui.start('#firebaseui-auth-container', uiConfig)
      }
    }
  }
}
</script>

<style scoped>

</style>