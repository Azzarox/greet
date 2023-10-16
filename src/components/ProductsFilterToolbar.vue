<script setup>
import ProductsFilterByCategories from "./ProductsFilterByCategories.vue";
import ProductsFilterByNameOrPrice from "./ProductsFilterByNameOrPrice.vue";

const {
  updateFilterByValueHandler,
  updateFilterByCategoryHandler,
  categories,
} = defineProps({
  updateFilterByValueHandler: {
    type: Function,
    required: true,
  },
  updateFilterByCategoryHandler: {
    type: Function,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <v-toolbar :elevation="1" density="comfortable">
    <v-toolbar-title>Филтри</v-toolbar-title>
    <v-toolbar-items>
      <ProductsFilterByNameOrPrice
        @update-filter-option="updateFilterByValueHandler"
      />
      <ProductsFilterByCategories
        @update-filter-category="updateFilterByCategoryHandler"
        :categories="categories"
      />
    </v-toolbar-items>
  </v-toolbar>
</template>

<style></style>
