<template>
  <NavBar></NavBar>
  <div class="container">
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <Carousel></Carousel>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Carousel from "./components/Carousel";

export default {
  name: 'App',
  components: {
    Carousel,
    NavBar
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
