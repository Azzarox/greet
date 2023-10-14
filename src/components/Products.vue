<script setup>
import { ref, onMounted } from "vue";
import ProductsCard from "./ProductsCard.vue";

const productsList = ref([]);

onMounted(async () => {
  productsList.value = await fetch(
    "https://greet.bg/wp-json/wc/store/products?page=1"
  ).then((response) => response.json());
});
</script>


<template>
    <v-col cols="12" v-for="product in productsList" :key="`user-${product.id}`">
    <!-- <p>Images Source: 
        <ul>
            <li v-for="image in product.images" :key="`image-${image.id}`">
                <img :src="image.src" :alt="image.alt">
            </li>
        </ul>
    </p>
    <div v-html="product.name"></div>
    <div v-html="product.short_description">
    </div>
    <p>Categories: 
        <ul>
            <li v-for="(category, index) in product.categories" :key="`category-${index}-${category.slug}`">
                {{ category.name }}
            </li>
        </ul>
    </p> -->
    <ProductsCard :product="product" />
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
