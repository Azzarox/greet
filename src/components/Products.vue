<script setup>
import { ref, onMounted } from "vue";
import ProductsCard from "./ProductsCard.vue";
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";
VSkeletonLoader;

const productsList = ref([]);
const loadingState = ref(true);

onMounted(async () => {
  try {
    loadingState.value = true;

    productsList.value = await fetch(
      "https://greet.bg/wp-json/wc/store/products?page=1"
    ).then((response) => response.json());

    loadingState.value = false;
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
</script>

<template>
  <v-col cols="12" v-for="product in productsList" :key="`user-${product.id}`">
    <ProductsCard :loading="loadingState" :product="product" />
  </v-col>
</template>

<style scoped>
img {
  width: 300px;
  height: 300px;
  object-fit: cover; /* Maintain aspect ratio and cover the entire container */
  object-position: center top; /* Center the image within the container */
  border-radius: 50%; /* Make the image a circle (for square images) */
  border: 2px solid #ccc; /* Add a subtle border */
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Add a soft shadow */
}
</style>
