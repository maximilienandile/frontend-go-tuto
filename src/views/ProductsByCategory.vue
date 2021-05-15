<template>
  <NavBar></NavBar>
  <div class="container">
    <div class="row">
      <div v-for="product in products" :key="product.id" class="col-12 col-md-3 d-flex justify-content-center mt-3">
        <router-link :to="{ name:'ProductDetailRoute', params : {productId: product.id}}">
          <ProductThumbnail
              :price="product.totalPrice.display"
              :title="product.name"
              :additional-info="product.shortDescription"
              :image-url="product.image"
          ></ProductThumbnail>
        </router-link>
      </div>
    </div>
  </div>

</template>

<script>
import NavBar from "../components/NavBar";
import ProductThumbnail from "../components/ProductThumbnail";
import Webservice from "../webservice";
export default {
  name: "ProductsByCategory",
  components: {NavBar,ProductThumbnail},
  props: {
    categoryId: String
  },
  data(){
    return {
      products: null,
      loading: false,
    }
  },
  created() {
    this.loading = true
    Webservice.getProducts(this.categoryId).then((res)=> {
      this.products = res.data
      this.loading = false
    }).catch((err)=>{
      this.loading = false
      console.error(err)
    })

  }
}
</script>

<style scoped>

</style>