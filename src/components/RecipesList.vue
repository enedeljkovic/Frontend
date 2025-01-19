<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-list>
            <v-list-item
              v-for="(recipe, index) in recipes"
              :key="index"
              class="recipe-item"
            >
              <v-list-item-content>
                <v-list-item-title>{{ recipe.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ recipe.description }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "RecipesList",
    props: {
      recipes: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style>
  .recipe-item {
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    background-color: #f9f9f9;
  }
  </style>
  