<script setup>
import { ref } from "vue";
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});
const emits = defineEmits(["update-filter-category"]);

const pickedCategory = ref("Избери категория");
const pickCategory = (category, ev) => {
  pickedCategory.value = ev.target.textContent;
  emits("update-filter-category", category);
};
</script>

<template>
  <div class="d-flex justify-space-around">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">
          {{ pickedCategory }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(category, index) in props.categories"
          :key="index"
          :value="index"
          @click.prevent="pickCategory(category, $event)"
        >
          <v-list-item-title>
            {{ category }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<style scoped></style>
