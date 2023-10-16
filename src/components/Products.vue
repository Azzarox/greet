<script setup>
import { ref, onMounted } from "vue";
import ProductsCard from "./ProductsCard.vue";
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";
import { baseUrl } from "@/composables/baseUrl.js";
VSkeletonLoader;

const productsList = ref([]);
const loadingState = ref(true);

onMounted(async () => {
  try {
    loadingState.value = true;

    productsList.value = await fetch(
      `${baseUrl}/wp-json/wc/store/products?page=1`
    ).then((response) => response.json());

    loadingState.value = false;
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
</script>

<template>
  <v-container tag="div">
    <v-row>
      <v-col
        cols="12"
        sm="4"
        v-for="product in productsList"
        :key="`product-${product.id}`"
      >
        <ProductsCard :loading="loadingState" :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/*  */
</style>
