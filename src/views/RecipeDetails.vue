<template>
  <div class="recipe-details-page">
    <div v-if="recipe" class="recipe-card">
      <img :src="getRecipeImage(recipe)" alt="Slika recepta" class="recipe-img" />
      <div class="recipe-info">
        <h1>{{ recipe.name }}</h1>
        <p><strong>Kategorija:</strong> {{ recipe.category }}</p>
        <p><strong>Opis:</strong></p>
           <p v-html="formatDescription(recipe.description)"></p>

        <div class="ingredients-section">
          <h3>Sastojci i zamjene:</h3>
          <ul>
            <li v-for="ingredient in recipe.ingredients" :key="ingredient">
              <strong>{{ ingredient }}</strong>
              <span v-if="substitutes[ingredient] && substitutes[ingredient].length">
                – zamjene: {{ substitutes[ingredient].join(', ') }}
              </span>
              <span v-else>– nema zamjena</span>
            </li>
          </ul>
        </div>

        <button v-if="!isFavorite" @click="addToFavorites">❤️ Dodaj u omiljene</button>
        <button v-else @click="removeFromFavorites">💔 Makni iz omiljenih</button>

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
      isFavorite: false,
      substitutes: {},
      userId: 3,
      substitutesMap: {
        "mlijeko": ["biljno mlijeko (zobeno, bademovo)"],
        "jaje": ["chia sjemenke + voda"],
        "maslac": ["biljni margarin"],
        "brašno": ["zobeno brašno"],
        "šećer": ["med"],
        "vanilin šećer": ["vanilija ekstrakt"],
        "ulje": ["maslac"],
        "majoneza": ["grčki jogurt"],
        "vrhnje": ["kokosovo mlijeko"],
        "sol": ["soja umak"],
        "sir": ["nutritivni kvasac"],
        "piletina": ["tofu"],
        "govedina": ["seitan"],
        "riba": ["gljive"],
        "mljeveno meso": ["leća"],
        "jogurt": ["sojin jogurt", "biljni jogurt", "kiselo vrhnje"],
        "maslinovo ulje": ["ulje repice", "avokado ulje"],
        "parmezan": ["prepržene krušne mrvice", "nutritivni kvasac"],
        "krumpir": ["slatki krumpir"],
        "tjestenina": ["tikvice rezanci", "rižina tjestenina"],
        "kvasac": ["soda bikarbona + ocat", "soda bikarbona + limun"],
        "čokolada": ["kakao + kokosovo ulje", "karob prah"],
        "sladoled": ["zamrznuti banana-blend"],
        "vrhnje za kuhanje": ["kašica od indijskih oraščića", "biljna zamjena"],
        "šlag": ["kokosova krema", "kokosov šlag"],
        "kvasac za pizzu": ["soda + limun"],
        "sirup od agave": ["javorov sirup"],
        "mljeveni lan": ["zamjena za jaje"],
        "mljeveni orasi": ["mljeveni suncokret"],
        "mljeveni bademi": ["kokosovo brašno"],
        "mljeveni keks": ["zobene pahuljice"],
        "kukuruz": ["mladi grašak"],
        "grašak": ["leća"],
        "leća": ["slanutak"],
        "slanutak": ["bijeli grah"],
        "bijeli grah": ["crveni grah"],
        "crveni grah": ["crna soja"],
        "zobene pahuljice": ["rižini krekeri"],
        "rižini krekeri": ["kukuruzne pahuljice"],
        "kukuruzne pahuljice": ["cornflakes bez šećera"]
      }
    };
  },
  methods: {
    async fetchRecipe() {
      const id = this.$route.params.id;
      try {
        const res = await axios.get(`http://localhost:3001/api/v1/recipes/${id}`);
        const r = res.data.recipe;
        this.recipe = {
          ...r,
          ingredients: typeof r.ingredients === 'string'
            ? r.ingredients.replace(/[{}"]/g, '').split(',').map(i => i.trim())
            : r.ingredients
        };
        this.fetchSubstitutes();
      } catch (err) {
        console.error('Greška pri dohvaćanju recepta:', err);
      }
    },
    fetchSubstitutes() {
      for (const ing of this.recipe.ingredients) {
        const clean = ing
          .toLowerCase()
          .replace(/[0-9]/g, '')
          .replace(/[^a-zA-Zćčžšđ\s]/g, '')
          .trim()
          .split(' ')
          .filter(w => w.length > 2)
          .pop();

        this.substitutes[ing] = this.substitutesMap[clean] || [];
      }
    },
    formatDescription(text) {
      return text ? text.replace(/\n/g, '<br>') : '';
    },
    async fetchComments() {
      try {
        const res = await axios.get(`http://localhost:3001/api/v1/recipes/${this.recipe.id}/comments`);
        this.comments = res.data.comments;
      } catch (err) {
        console.error('Greška pri dohvaćanju komentara:', err);
      }
    },
    async checkIfFavorite() {
      try {
        const res = await axios.get(`http://localhost:3001/api/v1/user/${this.userId}/favorites`);
        this.isFavorite = res.data.favorites.some(f => f.id === this.recipe.id);
      } catch (err) {
        console.error('Greška pri dohvaćanju favorita:', err);
      }
    },
    async addToFavorites() {
      try {
        await axios.post(`http://localhost:3001/api/v1/user/${this.userId}/favorites`, {
          recipeId: this.recipe.id
        });
        this.isFavorite = true;
      } catch (err) {
        console.error('Greška pri dodavanju u omiljene:', err);
      }
    },
    async removeFromFavorites() {
      try {
        await axios.delete(`http://localhost:3001/api/v1/user/${this.userId}/favorites/${this.recipe.id}`);
        this.isFavorite = false;
      } catch (err) {
        console.error('Greška pri uklanjanju iz omiljenih:', err);
      }
    },
    async saveToHistory() {
      try {
        await axios.post('http://localhost:3001/api/v1/history', {
          ingredientsList: this.recipe.ingredients
        });
        alert('Recept spremljen u povijest!');
      } catch (err) {
        console.error('Greška pri spremanju u povijest:', err);
      }
    },
    getRecipeImage(recipe) {
      if (recipe.image_url) return `http://localhost:3001${recipe.image_url}`;
      const cat = recipe.category.toLowerCase();
      if (cat.includes('vegan')) return '/images/vegan.jpg';
      if (cat.includes('vegetar')) return '/images/vegetarian.jpg';
      if (cat.includes('meat') || cat.includes('meso')) return '/images/meat.jpg';
      if (cat.includes('dessert')) return '/images/dessert.jpg';
      return '/images/default.jpg';
    },
    async submitComment() {
      try {
        const res = await axios.post(`http://localhost:3001/api/v1/recipes/${this.recipe.id}/comments`, {
          content: this.newComment.content,
          rating: this.newComment.rating
        });
        this.comments.push(res.data.comment);
        this.newComment.content = '';
        this.newComment.rating = '';
      } catch (err) {
        console.error('Greška pri slanju komentara:', err);
      }
    }
  },
  async mounted() {
    await this.fetchRecipe();
    await this.fetchComments();
    await this.checkIfFavorite();
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

.ingredients-section ul {
  list-style: none;
  padding: 0;
}

.ingredients-section li {
  margin-bottom: 0.5rem;
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
