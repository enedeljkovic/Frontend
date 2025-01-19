<template>
  <v-app>
   
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>InstaRecipe</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="goHome">Home</v-btn>
      <v-btn text @click="goFavorites">Favorites</v-btn>
    </v-app-bar>

    
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <Home v-if="currentPage === 'home'" />
            <Favorites v-if="currentPage === 'favorites'" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home.vue'
import Favorites from './components/Favorites.vue'

export default {
  name: 'App',
  components: {
    Home,
    Favorites
  },
  data() {
    return {
      currentPage: 'home' 
    }
  },
  methods: {
    goHome() {
      this.currentPage = 'home' 
    },
    goFavorites() {
      this.currentPage = 'favorites' 
    }
  }
}
</script>

<style scoped>
.v-application {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #ffffff;
}
</style>
