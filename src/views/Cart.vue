<template>
  <NavBar></NavBar>
  <h1>Cart</h1>
  <Loader v-if="loading"></Loader>
  <div v-else>
    <ul v-if="cart" class="list-group">
      <li v-for="item in this.cart.items" :key="item.id" class="list-group-item">
        {{item.title}} - {{item.shortDescription}} <br>
        Quantity: {{item.quantity}} <br>
        Total : {{item.totalPriceVATInc.display}}
      </li>
      <li>
        Total ({{cart.countItems}}) : {{cart.totalPriceVATInc.display}} <br>
        Shipping : 0 <br>
        Grand Total: {{cart.totalPriceVATInc.display}} (VAT : {{cart.totalVAT.display}})
      </li>
    </ul>
    <button type="button" class="btn btn-success" @click="onClickCheckout">Checkout</button>
  </div>


  <div class="alert alert-danger mt-3" role="alert" v-if="showErrorAlert">
    {{ errorMessage }}
  </div>

</template>

<script>
import NavBar from "../components/NavBar";
import AuthHelper from "../authHelper";
import Webservice from "../webservice";
import Loader from "../components/Loader";
import {loadStripe} from "@stripe/stripe-js"

export default {
  name: "Cart",
  components: {Loader, NavBar},
  data(){
    return {
      errorMessage: "",
      showErrorAlert : false,
      loading: false,
      cart: null,
    }
  },
  methods: {
    onClickCheckout(){
      loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY).then((stripeLoaded)=> {
        console.log(stripeLoaded)
        AuthHelper.getCurrentUser().then((user)=> {
          // stripe is loaded
          // we have the current user
          Webservice.checkout(user.idToken,"STRIPE","","EUR")
              .then((res)=>{
                console.log(res)
                alert("checkout call OK !")
                stripeLoaded.redirectToCheckout({sessionId: res.data.sessionId})
              }).catch((err)=>{
                console.log(err)
          })
        }).catch((err)=>{
          console.log("err no current user: "+ err)
          this.$router.push({name:"LoginRoute"})
        })

      }).catch((err)=> {
        console.log("impossible to load stripe :"+err)
      })



    }
  },
  created() {
    this.loading = true
    AuthHelper.getCurrentUser().then((user)=> {
      Webservice.getCart(user.idToken).then((res)=>{
        this.cart = res.data
        console.log(this.cart)
        this.loading = false
      }).catch((err)=>{
        this.loading = false
        this.errorMessage = "Impossible to retrieve your cart, please retry later"
        this.showErrorAlert = true
        console.error("impossible to load cart : "+err)
      })
    }).catch((err)=>{
      // What to do ?
      console.error("error while retrieving the current user:"+err)
      this.$router.push({name:"LoginRoute"})
    })
  }
}
</script>

<style scoped>

</style>