<template>
  <div class="recipe-details">
    <button class="back-btn" @click="$router.push('/home')">⬅ Natrag</button>

    <div v-if="recipe" class="recipe-container">
      <h1>{{ recipe.name }}</h1>
      <img :src="getImageUrl(recipe)" alt="Slika recepta" class="recipe-img" />

      <div class="info">
        <p><strong>Kategorija:</strong> {{ recipe.category }}</p>
        <p><strong>Sastojci:</strong> {{ recipe.ingredients.join(', ') }}</p>
        <p><strong>Opis:</strong> {{ recipe.description }}</p>
      </div>

      <div class="rating-section">
        <h3>Ocijeni recept:</h3>
        <div class="stars">
          <span v-for="n in 5" :key="n" @click="rateRecipe(n)">⭐</span>
        </div>
        <p v-if="averageRating">Prosječna ocjena: {{ averageRating.toFixed(1) }}/5</p>
      </div>

      <div class="comments-section">
        <h3>Komentari:</h3>
        <form @submit.prevent="submitComment">
          <textarea v-model="newComment" placeholder="Napiši komentar..." required></textarea>
          <button type="submit">💬 Dodaj komentar</button>
        </form>

        <ul class="comments-list">
          <li v-for="(comment, index) in comments" :key="index">
            {{ comment }}
          </li>
        </ul>
      </div>
    </div>

    <p v-else>Učitavanje recepta...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      recipe: null,
      comments: [],
      newComment: '',
      ratings: [],
      averageRating: null
    };
  },
  methods: {
    async fetchRecipe() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/recipes/${id}`);
        const r = response.data.recipe;
        this.recipe = {
          ...r,
          ingredients: typeof r.ingredients === 'string'
            ? r.ingredients.replace(/[{}"]/g, '').split(',')
            : r.ingredients
        };
        // Za potrebe primjera – privremeno punimo dummy komentare i ocjene
        this.comments = r.comments || [];
        this.ratings = r.ratings || [];
        this.calculateAverage();
      } catch (error) {
        console.error('Greška pri dohvaćanju recepta:', error);
      }
    },
    getImageUrl(recipe) {
      return recipe.image_url ? `http://localhost:3001${recipe.image_url}` : '/images/default.jpg';
    },
    submitComment() {
      if (this.newComment.trim()) {
        this.comments.push(this.newComment.trim());
        this.newComment = '';
      }
    },
    rateRecipe(rating) {
      this.ratings.push(rating);
      this.calculateAverage();
    },
    calculateAverage() {
      if (this.ratings.length === 0) return;
      const sum = this.ratings.reduce((acc, r) => acc + r, 0);
      this.averageRating = sum / this.ratings.length;
    }
  },
  mounted() {
    this.fetchRecipe();
  }
};
</script>

<style scoped>
.recipe-details {
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
  background-color: #fffdf6;
}

.back-btn {
  background-color: #ccc;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 1rem;
}

.recipe-container {
  background: #ffffff;
  padding: 2rem;
  border-radius: 14px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  max-width: 700px;
  margin: auto;
}

.recipe-img {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.info p {
  margin: 0.8rem 0;
  font-size: 1.1rem;
  color: #333;
}

.comments-section {
  margin-top: 2rem;
}

.comments-section textarea {
  width: 100%;
  padding: 0.8rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
}

.comments-section button {
  background-color: #e67e22;
  color: white;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.comments-list {
  list-style-type: none;
  padding: 0;
  margin-top: 1rem;
}

.comments-list li {
  background: #f4f4f4;
  padding: 0.6rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
}

.rating-section {
  margin-top: 2rem;
}

.stars span {
  font-size: 2rem;
  cursor: pointer;
}
</style>
