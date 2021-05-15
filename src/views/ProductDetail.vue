<template>
  <NavBar></NavBar>
  <p>{{productId}}</p>

</template>

<script>
import NavBar from "../components/NavBar";
export default {
  name: "ProductDetail",
  components: {NavBar},
  props: {
    productId: String
  }
}
</script>

<style scoped>

</style>