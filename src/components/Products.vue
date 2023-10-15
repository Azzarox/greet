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
  <v-container>
    <v-row no-gutters>
      <v-col
        cols="12"
        md="6"
        lg="4"
        v-for="product in productsList"
        :key="`product-${product.id}`"
      >
        <v-sheet class="ma-2 pa-2">
          <ProductsCard :loading="loadingState" :product="product" />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/*  */
</style>
