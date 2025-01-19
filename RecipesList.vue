<template>
    <v-container>
      <v-btn @click="fetchRecipes">Pronađi Recept</v-btn>
      <v-list>
        <v-list-item v-for="recipe in matchingRecipes" :key="recipe.id">
          {{ recipe.name }}
          <v-btn @click="addFavorite(recipe.id)">Dodaj u omiljene</v-btn>
        </v-list-item>
      </v-list>
    </v-container>
  </template>
  
  <script>
  import { useStore } from '../store'
  
  export default {
    computed: {
      matchingRecipes() {
        const store = useStore()
        return store.recipes.filter(recipe =>
          recipe.ingredients.every(ingredient => store.ingredients.includes(ingredient))
        )
      }
    },
    methods: {
      addFavorite(recipeId) {
        const store = useStore()
        store.addFavoriteRecipe(recipeId)
      }
    }
  }
  </script>
  