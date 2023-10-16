<script setup>
import { ref } from "vue";
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";
import AddToCartButton from "@/composables/AddToCartButton.vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});

const showDescription = ref(false);
</script>

<template>
  <!-- <v-card class="mx-auto d-flex flex-column" max-width="344" height="100%" > -->
  <v-card class="mx-auto" max-width="344" height="100%">
    <v-skeleton-loader
      v-if="props.loading === true"
      type="image,heading, subtitle, ossein, button"
    ></v-skeleton-loader>
    <template v-else>
      <v-img
        :src="props.product.images[0].thumbnail"
        :srcset="props.product.images[0].srcset"
        :alt="props.product.images[0].alt"
        cover
      ></v-img>

      <v-card-title>
        <span v-html="props.product.name"></span>
      </v-card-title>

      <v-card-subtitle tag="div">
        <v-chip-group>
          <v-chip
            size="small"
            v-for="category in props.product.categories"
            :key="`category-${category.slug}`"
            >{{ category.name }}</v-chip
          >
        </v-chip-group>
      </v-card-subtitle>

      <v-card-actions>
        <AddToCartButton :url="product.add_to_cart.url" :buttonText="product.add_to_cart.text === 'Добавяне в количката' ? product.add_to_cart.text : 'Добави с опции'"/>

        <v-spacer></v-spacer>
        <v-btn
          :icon="showDescription ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="showDescription = !showDescription"
        ></v-btn>
        <v-spacer></v-spacer>

      </v-card-actions>
      <span v-html="props.product.price_html"></span>
      <v-expand-transition>
        <div v-show="showDescription">
          <v-divider></v-divider>

          <v-card-text>
            <span v-html="props.product.short_description"></span>
          </v-card-text>
        </div>
      </v-expand-transition>
    </template>
  </v-card>
</template>
