<template>
  <div class="recipe-details-page">
    <div v-if="recipe" class="recipe-card">
      <img :src="getRecipeImage(recipe)" alt="Slika recepta" class="recipe-img" />
      <div class="recipe-info">
        <h1>{{ recipe.name }}</h1>
        <p><strong>Kategorija:</strong> {{ recipe.category }}</p>
        <p><strong>Opis:</strong> {{ recipe.description }}</p>
        <p><strong>Sastojci:</strong> {{ recipe.ingredients.join(', ') }}</p>
        <button @click="addToFavorites">❤️ Dodaj u omiljene</button>
        <button @click="saveToHistory">💾 Spremi pretragu</button>
      </div>
    </div>

    <div class="comments-section">
      <h2>Komentari i ocjene</h2>

      <form @submit.prevent="submitComment" class="comment-form">
        <label>Komentar:</label>
        <textarea v-model="newComment.content" required></textarea>

        <label>Ocjena (1-5):</label>
        <select v-model="newComment.rating" required>
          <option disabled value="">Odaberi ocjenu</option>
          <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
        </select>

        <button type="submit">Pošalji</button>
      </form>

      <div v-if="comments.length" class="comments-list">
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <p><strong>Ocjena:</strong> {{ comment.rating }}/5</p>
          <p>{{ comment.content }}</p>
        </div>
      </div>
      <div v-else>
        <p>Nema komentara još.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      recipe: null,
      comments: [],
      newComment: {
        content: '',
        rating: ''
      },
      userId: 1 
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
          ingredients: typeof r.ingredients === 'string' ? r.ingredients.replace(/[{}"]/g, '').split(',') : r.ingredients
        };
      } catch (err) {
        console.error('Greška pri dohvaćanju recepta:', err);
      }
    },
    async fetchComments() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/recipes/${id}/comments`);
        this.comments = response.data.comments;
      } catch (err) {
        console.error('Greška pri dohvaćanju komentara:', err);
      }
    },
    async submitComment() {
      const id = this.$route.params.id;
      try {
        await axios.post(`http://localhost:3001/api/v1/recipes/${id}/comments`, this.newComment);
        this.newComment = { content: '', rating: '' };
        this.fetchComments();
      } catch (err) {
        console.error('Greška pri slanju komentara:', err);
      }
    },
    async addToFavorites() {
  if (!this.recipe || !this.recipe.id) {
    alert('Recept nije ispravno učitan.');
    return;
  }

  try {
    const res = await axios.post(`http://localhost:3001/api/v1/user/${this.userId}/favorites`, {
      recipeId: this.recipe.id
    });
    alert(res.data.message || 'Dodano u omiljene!');
  } catch (err) {
    console.error('Greška pri dodavanju u omiljene:', err);
    alert(err.response?.data?.message || 'Greška pri dodavanju u omiljene.');
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
    }
  },
  mounted() {
    this.fetchRecipe();
    this.fetchComments();
  }
};
</script>

<style scoped>
.recipe-details-page {
  max-width: 800px;
  margin: 2rem auto;
  background: #fffdfa;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', sans-serif;
}

.recipe-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
}

.recipe-info h1 {
  margin-top: 1rem;
  color: #e67e22;
}

button {
  margin-top: 1rem;
  background-color: #f57c00;
  color: white;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #e64a19;
}

.comments-section {
  margin-top: 2rem;
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comment-form textarea,
.comment-form select {
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.comment-item {
  background: #fff3e0;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
}
</style>
