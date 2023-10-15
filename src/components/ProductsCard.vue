<script setup>
import { ref } from "vue";
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  loading:{
    type: Boolean,
    required: true
  }
});

const showDescription = ref(false);
</script>


<template>
  <v-card class="mx-auto" max-width="344">
    <v-skeleton-loader v-if="props.loading === true" type="image,heading, subtitle, ossein, button"></v-skeleton-loader>
    <template v-else>
      <v-img
        :src="props.product.images[0].thumbnail"
        :srcset="props.product.images[0].srcset"
        :alt="props.product.images[0].alt"
        class="customImage"
        height="100%"
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
          >{{ category.name }}</v-chip>
        </v-chip-group>
      </v-card-subtitle>

      <v-card-actions>
        <v-btn color="green-lighten-1" variant="text">Add to cart</v-btn>

        <v-spacer></v-spacer>
        <v-btn
          :icon="showDescription ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="showDescription = !showDescription"
        ></v-btn>
      </v-card-actions>

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

<style scoped></style>
