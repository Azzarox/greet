<script setup>
import { ref, onMounted, computed } from "vue";
import ProductsCard from "./ProductsCard.vue";
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";
import { baseUrl } from "@/composables/baseUrl.js";
import { sortByNameAndPrice } from "../utils/sortByNameAndPrice.js";
import { VInfiniteScroll } from "vuetify/labs/VInfiniteScroll";
import ProductsFilterToolbar from "./ProductsFilterToolbar.vue";

VSkeletonLoader;

const productsList = ref([]);
const loadingState = ref(true);
const filterBy = ref("");
const filterByCategory = ref("");
const currentPage = ref(1);

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

  return sortByNameAndPrice(sortedProductList, filterBy.value);
});

const categories = computed(() => {
  const list = [...productsList.value];
  const uniqueCategories = new Set();
  list.forEach((product) => {
    product.categories.forEach((category) => {
      uniqueCategories.add(category.name);
    });
  });
  uniqueCategories.add("Всички");
  return Array.from(uniqueCategories); // Convert Set to an Array
});

const updateFilterByValueHandler = (option) => {
  filterBy.value = option;
};

const updateFilterByCategoryHandler = (category) => {
  filterByCategory.value = category;
};

const filteredProductsByCategory = computed(() => {
  return productsList.value.filter((product) => {
    const productCategories = product.categories.map(
      (category) => category.name
    );
    if (!productCategories.includes(filterByCategory.value)) return false;
    return true;
  });
});

const productsListWithFilters = computed(() => {
  if (filterByCategory.value) {
    if (filterByCategory.value == "Всички") {
      return filteredProducts.value;
    }

    const filteredByCategories = filteredProductsByCategory.value;
    return sortByNameAndPrice(filteredByCategories, filterBy.value);
  } else {
    return filteredProducts.value;
  }
});

async function loadMore({ done }) {
  try {
    if (currentPage.value === 24) {
      done("empty");
      return;
    }

    loadingState.value = true;

    currentPage.value++;

    const nextPage = await fetch(
      `${baseUrl}/wp-json/wc/store/products?page=${currentPage.value}`
    ).then((response) => response.json());

    productsList.value = productsList.value.concat(nextPage);
    loadingState.value = false;

    done("ok");
  } catch (error) {
    console.error("An error occurred:", error);
    done("error");
  }
}
</script>

<template>
  <v-container tag="div">
    <v-container>
      <ProductsFilterToolbar
        :categories="categories"
        :updateFilterByValueHandler="updateFilterByValueHandler"
        :updateFilterByCategoryHandler="updateFilterByCategoryHandler"
      />
    </v-container>

    <v-row>
      <v-col
        cols="12"
        sm="4"
        v-for="product in productsListWithFilters"
        :key="`product-${product.id}`"
      >
        <ProductsCard :loading="loadingState" :product="product" />
      </v-col>
    </v-row>

    <v-infinite-scroll
      :height="300"
      :items="productsListWithFilters"
      :onLoad="loadMore"
      direction="vertical"
      emptyText="There is no more results to load!"
      mode="intersect"
      side="end"
    >
      <template v-for="(item, index) in items" :key="item">
        <div :class="['pa-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
          Item #{{ item }}
        </div>
      </template>
    </v-infinite-scroll>
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
