<script setup>
import { ref, onMounted, computed } from "vue";
import ProductsCard from "./ProductsCard.vue";
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";
import { baseUrl } from "@/composables/baseUrl.js";
import CategoriesDropdown from "./CategoriesDropdown.vue";
import ProductsFilterByNameOrPrice from "./ProductsFilterByNameOrPrice.vue";
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

  if (filterBy.value === "Име") {
    sortedProductList.sort((a, b) => a.name.localeCompare(b.name));
  } else if (filterBy.value === "Цена") {
    sortedProductList.sort((a, b) => a.prices.price - b.prices.price);
  }
  return sortedProductList;
});

const categories = computed(() => {
  const list = [...productsList.value];
  const uniqueCategories = new Set();
  list.forEach((product) => {
    product.categories.forEach((category) => {
      uniqueCategories.add(category.name);
    });
  });
  return Array.from(uniqueCategories); // Convert Set to an Array
});

const updateFilterByValueHandler = (option) => {
  filterBy.value = option;
};
</script>

<template>
  <v-container tag="div">
    <v-container>
      <v-toolbar title="Филтри" density="comfortable">
        <v-toolbar-items>
          <ProductsFilterByNameOrPrice
            @update-filter-option="updateFilterByValueHandler"
          />
          <CategoriesDropdown :categories="categories" />
        </v-toolbar-items>
      </v-toolbar>
    </v-container>
    
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
/* .button-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;
} */
</style>
