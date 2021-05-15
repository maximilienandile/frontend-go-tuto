<template>
  <div class="card" style="width: 12rem; ">
    <img src="@/assets/cat.jpeg" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">{{ price }}</p>
      <p>{{ additionalInfo }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductThumbnail",
  props: {
    title: String,
    price : String,
    additionalInfo: String
  }
}
</script>

<style scoped>

</style>