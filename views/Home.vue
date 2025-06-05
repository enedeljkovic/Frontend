<template>
  <div class="home-page">
    <div class="header">
      <h1 class="title">🍽️ InstaRecipe</h1>
      <router-link to="/add-recipe" class="add-btn">➕ Dodaj novi recept</router-link>
    </div>

    <div class="recipes-grid">
      <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card">
        <img :src="getRecipeImage(recipe)" alt="Recept slika" class="recipe-img" />
        <div class="recipe-info">
          <h2>{{ recipe.name }}</h2>
          <p><span class="label">📂 Kategorija:</span> {{ recipe.category }}</p>
          <p><span class="label">🧂 Sastojci:</span> {{ recipe.ingredients.join(', ') }}</p>
          <p><span class="label">📝 Opis:</span> {{ recipe.description }}</p>
        </div>
      </div>
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
  methods: {
    async fetchRecipes() {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/recipes');
        this.recipes = response.data.recipes.map(r => ({
          ...r,
          ingredients: typeof r.ingredients === 'string' ? JSON.parse(r.ingredients) : r.ingredients,
        }));
      } catch (error) {
        console.error('Greška pri dohvaćanju recepata:', error);
      }
    },
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
  beforeRouteEnter(to, from, next) {
    next(vm => vm.fetchRecipes());
  },
};
</script>

<style scoped>
.home-page {
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
  background: #fffdf6;
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
  font-size: 2.2rem;
  font-weight: bold;
  margin: 0;
}

.add-btn {
  background-color: #42b983;
  color: white;
  padding: 0.7rem 1.3rem;
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.8rem;
}

.recipe-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.recipe-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #eee0cc;
}

.recipe-info {
  padding: 1.2rem;
  line-height: 1.5;
}

.recipe-info h2 {
  color: #6d4c41;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}

.recipe-info p {
  margin: 0.4rem 0;
  color: #333;
  font-size: 0.95rem;
}

.label {
  font-weight: bold;
  color: #8d6e63;
}
</style>
