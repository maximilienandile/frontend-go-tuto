<template>
  <NavBar></NavBar>
  <div class="container">
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <Carousel></Carousel>
      </div>
    </div>
    {{products}}
    <h3 class="mt-3">Popular products</h3>
    <div class="row">
      <div v-for="product in products" :key="product.id" class="col-12 col-md-3 d-flex justify-content-center mt-3">
        <ProductThumbnail
            :price="product.totalPrice.display"
            :title="product.name"
            :additional-info="product.shortDescription"
            :image-url="product.image"
        ></ProductThumbnail>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Carousel from "./components/Carousel";
import ProductThumbnail from "./components/ProductThumbnail";
import Webservice from "@/webservice"

export default {
  name: 'App',
  components: {
    ProductThumbnail,
    Carousel,
    NavBar
  },
  data(){
    return {
      products: null,
    }
  },
  created() {
    Webservice.getProducts().then((res)=> {
      this.products = res.data
    }).catch((err)=>{
      alert(err)
    })
    Webservice.getCategories().then((res)=> {
      alert(res.data)
    }).catch((err)=>{
      alert(err)
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
