<template>
  <div class="home-page">
    <div class="header">
      <h1 class="title">🍽️ InstaRecipe - Svi recepti</h1>
      <div class="btn-group">
        <router-link to="/add-recipe" class="btn">➕ Dodaj novi recept</router-link>
        <router-link to="/profile" class="btn">👤 Profil</router-link>
      </div>
    </div>

    <div class="filters">
      <input
        type="text"
        v-model="searchIngredient"
        placeholder="🔍 Traži po sastojcima (npr. krumpir)"
        class="search-input"
      />
      <select v-model="selectedCategory" class="category-select">
        <option value="">Sve kategorije</option>
        <option value="vegetarian">Vegetarijansko</option>
        <option value="vegan">Vegansko</option>
        <option value="meat">Mesno</option>
      </select>
    </div>

    <h2 class="section-title">🍴 Svi recepti</h2>
    <div class="recipes-grid">
      <router-link
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        :to="`/recipe/${recipe.id}`"
        class="recipe-card"
      >
        <img :src="getRecipeImage(recipe)" alt="Recept slika" class="recipe-img" />
        <div class="recipe-info">
          <h2>{{ recipe.name }}</h2>
          <p><strong>Kategorija:</strong> {{ recipe.category }}</p>
          <p><strong>Sastojci:</strong> {{ recipe.ingredients.join(', ') }}</p>
        </div>
      </router-link>
    </div>

    <div v-if="favorites.length" class="favorites-section">
      <h2 class="section-title">⭐ Omiljeni recepti</h2>
      <ul>
        <li v-for="fav in favorites" :key="fav.id">{{ fav.name }}</li>
      </ul>
    </div>

    <div v-if="searchHistory.length" class="history-section">
      <h2 class="section-title">🕘 Povijest pretraživanja</h2>
      <ul>
        <li v-for="(item, index) in searchHistory" :key="index">
          {{ item.ingredientsList.join(', ') }} ({{ new Date(item.timestamp).toLocaleString() }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      recipes: [],
      favorites: [],
      searchHistory: [],
      searchIngredient: '',
      selectedCategory: '',
      userId: 1 
    };
  },
  computed: {
    filteredRecipes() {
      return this.recipes.filter(recipe => {
        const matchCategory =
          !this.selectedCategory || recipe.category.toLowerCase() === this.selectedCategory;
        const matchIngredient =
          !this.searchIngredient ||
          recipe.ingredients.some(ing =>
            ing.toLowerCase().includes(this.searchIngredient.toLowerCase())
          );
        return matchCategory && matchIngredient;
      });
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/recipes');
      this.recipes = response.data.recipes.map(r => ({
        ...r,
        ingredients:
          typeof r.ingredients === 'string'
            ? r.ingredients.replace(/[{}"]/g, '').split(',').map(i => i.trim())
            : r.ingredients
      }));
    } catch (error) {
      console.error('Greška pri dohvaćanju recepata:', error);
    }

    try {
      const favs = await axios.get(`http://localhost:3001/api/v1/user/${this.userId}/favorites`);
      this.favorites = favs.data.favorites || [];
    } catch (error) {
      console.error('Greška pri dohvaćanju omiljenih recepata:', error);
    }

    try {
      const history = await axios.get('http://localhost:3001/api/v1/history');
      this.searchHistory = history.data.searchHistory || [];
    } catch (error) {
      console.error('Greška pri dohvaćanju povijesti pretraživanja:', error);
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
    }
  }
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
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.title {
  color: #e67e22;
  font-size: 2rem;
  margin: 0;
}

.btn-group {
  display: flex;
  gap: 0.7rem;
}

.btn {
  background-color: #42b983;
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #369b6d;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.search-input,
.category-select {
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  min-width: 200px;
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
  text-decoration: none;
  color: inherit;
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

.section-title {
  margin-top: 3rem;
  color: #d35400;
}
</style>
