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
      <button @click="onAddToCart" type="button" class="btn btn-success">Add to Cart</button>
    </div>

  </div>



</template>

<script>
import NavBar from "../components/NavBar";
import Webservice from "../webservice";
import Loader from "../components/Loader";
export default {
  name: "ProductDetail",
  components: {Loader, NavBar},
  props: {
    productId: String
  },
  data(){
    return {
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

      Webservice.addToCart(this.productId,1).then((res)=> {
        alert("OK"+res)
      }).catch((err)=> {
        alert(err)
      })

    }
  }
}
</script>

<style scoped>

</style>