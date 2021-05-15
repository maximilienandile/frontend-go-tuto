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
  }
}
</script>

<style scoped>

</style>