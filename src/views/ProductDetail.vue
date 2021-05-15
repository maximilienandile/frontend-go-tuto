<template>
  <NavBar></NavBar>
  <p>{{productId}}</p>
  <p>{{product}}</p>

</template>

<script>
import NavBar from "../components/NavBar";
import Webservice from "../webservice";
export default {
  name: "ProductDetail",
  components: {NavBar},
  props: {
    productId: String
  },
  data(){
    return {
      product: null,
    }
  },
  created() {
    Webservice.getProductByID(this.productId).then((res)=> {
      this.product = res.data
    }).catch((err)=>{
      alert(err)
    })
  }
}
</script>

<style scoped>

</style>