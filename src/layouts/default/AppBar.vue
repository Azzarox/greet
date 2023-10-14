<script setup>
import Products from "@/components/Products.vue";

</script>

<template>
  <v-card color="grey-lighten-3">
    <v-layout>
      <v-app-bar
        color="teal-darken-4"
        image="https://picsum.photos/1920/1080?random"
      >
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>

        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Greet</v-app-bar-title>

        <v-spacer></v-spacer>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <v-row dense>
            <Products />
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
