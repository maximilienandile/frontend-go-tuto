<template>
  <nav class="navbar navbar-light bg-light fixed-top navbar-expand-lg">
    <!-- Nav Main container -->
    <div class="container-fluid">
      <!-- Brand name -->
      <a class="navbar-brand" href="#">
        <img src="@/assets/cat_logo.jpg" alt="" width="30" height="24" class="d-inline-block align-text-top">
        Bootstrap
      </a>
      <!-- Links toggle button -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="true" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Links-->
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
          <a class="nav-link" href="#">Features</a>
          <a class="nav-link" href="#">Pricing</a>
          <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </div>
      </div>


    </div>
  </nav>
</template>

<script>
export default {
name: "Navbar",
  components: {}
}
</script>

<style scoped>

</style>