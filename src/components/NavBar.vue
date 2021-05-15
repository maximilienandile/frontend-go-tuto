<template>
  <nav class="navbar navbar-light bg-light fixed-top navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="@/assets/cat.jpeg" alt="" width="30" height="24" class="d-inline-block align-text-top">
        Gopher E-commerce
      </a>
      <!-- Dropdown button (burger button)-->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Links -->
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link" href="#">Plushes</a>
          <a class="nav-link" href="#">Clothes</a>
          <a class="nav-link" href="#">Accessories</a>
          <a class="nav-link" href="#" ><UserIcon></UserIcon></a>
          <a class="nav-link" href="#" >
              <CartIcon></CartIcon>
              <span class="">Cart 0</span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import UserIcon from "./icons/UserIcon";
import CartIcon from "./icons/CartIcon";
export default {
  name: "NavBar",
  components: {CartIcon, UserIcon}
}
</script>

<style scoped>

</style>