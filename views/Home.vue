<template>
  <div class="home-page">
    <div class="header">
      <h1 class="title">🍽️ InstaRecipe - Svi recepti</h1>
      <router-link to="/add-recipe" class="add-btn">➕ Dodaj novi recept</router-link>
    </div>

    <div class="recipes-grid">
      <router-link
        v-for="recipe in recipes"
        :key="recipe.id"
        :to="`/recipe/${recipe.id}`"
        class="recipe-card"
        style="text-decoration: none; color: inherit;"
      >
        <img :src="getRecipeImage(recipe)" alt="Recept slika" class="recipe-img" />
        <div class="recipe-info">
          <h2>{{ recipe.name }}</h2>
          <p><strong>Kategorija:</strong> {{ recipe.category }}</p>
          <p><strong>Sastojci:</strong> {{ recipe.ingredients.join(', ') }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      recipes: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/recipes');
      this.recipes = response.data.recipes.map(r => ({
        ...r,
        ingredients: typeof r.ingredients === 'string'
          ? r.ingredients.replace(/[{}"]/g, '').split(',')
          : r.ingredients,
      }));
    } catch (error) {
      console.error('Greška pri dohvaćanju recepata:', error);
    }
  },

  methods: {
    getRecipeImage(recipe) {
      if (recipe.image_url) return `http://localhost:3001${recipe.image_url}`;
      const lower = recipe.category.toLowerCase();
      if (lower.includes('vegan')) return '/images/vegan.jpg';
      if (lower.includes('vegetar')) return '/images/vegetarian.jpg';
      if (lower.includes('meso') || lower.includes('meat')) return '/images/meat.jpg';
      if (lower.includes('dessert')) return '/images/dessert.jpg';
      return '/images/default.jpg';
    },
  },
};
</script>

<style scoped>
.home-page {
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.title {
  color: #e67e22;
  font-size: 2rem;
  margin: 0;
}

.add-btn {
  background-color: #42b983;
  color: white;
  padding: 0.7rem 1.2rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background-color: #369b6d;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.recipe-card {
  background: #fffdfa;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.2s ease;
}

.recipe-card:hover {
  transform: translateY(-5px);
}

.recipe-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.recipe-info {
  padding: 1rem;
}

.recipe-info h2 {
  color: #6d4c41;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.recipe-info p {
  margin: 0.3rem 0;
  color: #333;
}
</style>
