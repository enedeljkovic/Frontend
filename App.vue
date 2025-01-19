<template>
  <v-app>
    <v-container>
      <!-- Komponenta za unos sastojaka -->
      <IngredientsInput />
      
      <!-- Komponenta za prikaz recepata, proslijeđujemo recipes kao prop -->
      <RecipesList :recipes="recipes" />
      
      <!-- Komponenta za omiljene recepte -->
      <FavoriteRecipes />
    </v-container>
  </v-app>
</template>

<script>
// Uvoz komponenti
import IngredientsInput from './components/IngredientsInput.vue'
import RecipesList from './components/RecipesList.vue'
import FavoriteRecipes from './components/FavoriteRecipes.vue'

export default {
  components: {
    IngredientsInput,
    RecipesList,
    FavoriteRecipes
  },
  data() {
    return {
      // Ovdje definiramo niz recepata
      recipes: [
        { name: "Carbonara", description: "Kremasta tjestenina s pancetom i jajima" },
        { name: "Bolognese", description: "Tjestenina s mesnim umakom od rajčice" },
        { name: "Pesto", description: "Tjestenina s umakom od bosiljka i češnjaka" },
      ],
    }
  }
}
</script>

<style scoped>
/* Stilovi za tvoju aplikaciju */
</style>
