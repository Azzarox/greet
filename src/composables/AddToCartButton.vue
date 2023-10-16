<script setup>
import { baseUrl } from "./baseUrl.js";

const { buttonText, url } = defineProps({
  buttonText: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

</script>

<template>
  <v-btn
    :href="url.includes('?add-to-cart') ? `${baseUrl}${url}` : url"
    target="_blank"
    color="green-lighten-1"
    variant="text"
    >{{ buttonText }}</v-btn
  >
</template>

<style></style>
