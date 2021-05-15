<template>
  <nav class="navbar navbar-light bg-light fixed-top navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="@/assets/cat.jpeg" alt="" width="30" height="24" class="d-inline-block align-text-top">
        Gopher E-commerce
      </a>
      <!-- Dropdown button (burger button)-->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Links -->
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link" href="#">Plushes</a>
          <a class="nav-link" href="#">Clothes</a>
          <a class="nav-link" href="#">Accessories</a>
          <a class="nav-link" href="#" ><UserIcon></UserIcon></a>
          <router-link :to="{name: 'CartRoute'}">
            <a class="nav-link" href="#" >
                <CartIcon></CartIcon>
                <span class="" v-if="!this.loading && this.cart">Cart {{ this.cart.countItems }}</span>
            </a>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import UserIcon from "./icons/UserIcon";
import CartIcon from "./icons/CartIcon";
import AuthHelper from "../authHelper";
import Webservice from "../webservice";
export default {
  name: "NavBar",
  components: {CartIcon, UserIcon},
  data(){
    return {
      loading: false,
      cart: null,
    }
  },
  created() {
    this.loading = true
    AuthHelper.getCurrentUser().then((user)=> {
      Webservice.getCart(user.idToken).then((res)=>{
        this.cart = res.data
        this.loading = false
      }).catch((err)=>{
        this.loading = false
        console.error("impossible to load cart : "+err)
      })
    }).catch((err)=>{
      this.loading = false
      // What to do ?
      console.log("user do not exists, no cart:"+err)
    })
  }
}
</script>

<style scoped>

</style>