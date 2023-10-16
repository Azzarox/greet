<script setup>
import { ref, onMounted, computed } from "vue";
import ProductsCard from "./ProductsCard.vue";
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";
import { baseUrl } from "@/composables/baseUrl.js";
VSkeletonLoader;

const productsList = ref([]);
const loadingState = ref(true);
const filterBy = ref("");

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

const filteredProducts = computed(() => {
  const sortedProductList = [...productsList.value];

  if (filterBy.value === "name") {
    sortedProductList.sort((a, b) => a.name.localeCompare(b.name));
  } else if (filterBy.value === "price") {
    sortedProductList.sort((a, b) => a.prices.price - b.prices.price);
  }

  return sortedProductList;
});
</script>

<template>
  <v-container tag="div">
    <div class="button-group">
      <v-btn class="ma-2" variant="outlined" @click.prevent="filterBy = 'name'"
        >Name</v-btn
      >
      <v-btn class="ma-2" variant="outlined" @click.prevent="filterBy = 'price'"
        >Price</v-btn
      >
      <v-btn class="ma-2" variant="outlined" @click.prevent="filterBy = ''"
        >Reset</v-btn
      >
    </div>

    <v-row>
      <v-col
        cols="12"
        sm="4"
        v-for="product in filteredProducts"
        :key="`product-${product.id}`"
      >
        <ProductsCard :loading="loadingState" :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.button-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
