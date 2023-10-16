<script setup>
import { ref, defineEmits } from "vue";

const emits = defineEmits(["update-filter-option"]);

const filteredText = ref("Сортирай по");
const filteredTextOptions = ["Име", "Цена"];

const selectFilterOption = (selectedOption) => {
  filteredText.value = selectedOption;
  emits("update-filter-option", selectedOption);
};
</script>

<template>
  <div class="d-flex justify-space-around">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">
          {{ filteredText }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(option, index) in filteredTextOptions"
          :key="index"
          :value="index"
        >
          <v-list-item-title @click.prevent="selectFilterOption(option)">{{
            option
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<style></style>
