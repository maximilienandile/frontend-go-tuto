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
      <button @click="getCurrentUser" type="button" class="btn btn-success">Current user</button>
      <button @click="signout" type="button" class="btn btn-success">Sign Out</button>

    </div>

  </div>


</template>

<script>
import NavBar from "../components/NavBar";
import Webservice from "../webservice";
import Loader from "../components/Loader";
import "firebase/compat/auth";
import AuthHelper from "../authHelper";

export default {
  name: "ProductDetail",
  components: {Loader, NavBar},
  props: {
    productId: String
  },
  data() {
    return {
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
    signout(){
      AuthHelper.signout()
    },
    getCurrentUser(){
      AuthHelper.getCurrentUser().then((user)=> {
        console.log(user)
      })

    },
    onAddToCart() {
      AuthHelper.getCurrentUserOrCreateAnonymous().then((res)=> {
        console.log('user retrieved')
        console.log(res)
        Webservice.addToCart(this.productId, 1, res.idToken).then((res) => {
          console.log("OK addToCart" + res)
        }).catch((err) => {
          console.log("impossible to add to cart" + err)
        })
      }).catch((err)=>{
        console.log("impossible to retrieve current user" + err)
      })
    }
  }
}
</script>

<style scoped>

</style>