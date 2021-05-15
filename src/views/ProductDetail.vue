<template>
  <NavBar></NavBar>
  <Loader v-if="loading"></Loader>
  <div v-else class="row">
    <div class="col">
      <img :src="product.image" :alt="product.name">
    </div>
    <div class="col">
      <h1>{{product.name}}</h1>
      <p>{{product.totalPrice.display}}</p>
      <p>{{product.shortDescription}}</p>

      <div class="alert alert-danger mt-3" role="alert" v-if="showErrorAlert">
        {{ errorMessage }}
      </div>


      <div class="alert alert-success mt-3" role="alert" v-if="showSuccessAlert">
        {{ successMessage }}
      </div>

      <button @click="onAddToCart" type="button" class="btn btn-success">Add to Cart</button>
    </div>

  </div>



</template>

<script>
import NavBar from "../components/NavBar";
import Webservice from "../webservice";
import Loader from "../components/Loader";
import AuthHelper from "../authHelper"

export default {
  name: "ProductDetail",
  components: {Loader, NavBar},
  props: {
    productId: String
  },
  data(){
    return {
      errorMessage: "",
      showErrorAlert : false,
      successMessage: "",
      showSuccessAlert : false,
      product: null,
      loading: false,
    }
  },
  created() {
    this.loading = true
    Webservice.getProductByID(this.productId).then((res)=> {
      this.product = res.data
      this.loading = false
    }).catch((err)=>{
      alert(err)
      this.loading = false
    })
  },
  methods: {
    onAddToCart(){
      AuthHelper.getCurrentUser().then((user)=> {
        Webservice.addToCart(this.productId,1, user.idToken).then((res)=> {
          this.successMessage = "item added to the cart"
          this.showSuccessAlert = true
        }).catch((err)=> {
          this.errorMessage = "Impossible to add to cart, please retry later"
          this.showErrorAlert = true
          console.error("impossible to add to cart :"+err)
        })
      }).catch((err)=>{
        // What to do ?
        console.error("error while retrieving the current user:"+err)
        this.$router.push({name:"LoginRoute"})
      })
    }
  }
}
</script>

<style scoped>

</style>