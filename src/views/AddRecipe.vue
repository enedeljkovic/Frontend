<template>
  <div class="add-recipe-page">
    <h1 class="title">🍲 Dodaj novi recept</h1>

    <form @submit.prevent="submitRecipe" class="recipe-form">
      <label>
        Naziv recepta:
        <input type="text" v-model="recipe.name" required />
      </label>

      <label>
        Opis pripreme:
        <textarea v-model="recipe.description" rows="4" required></textarea>
      </label>

      <label>
        Kategorija:
        <select v-model="recipe.category" required>
          <option disabled value="">Odaberite kategoriju</option>
          <option value="vegetarian">Vegetarijansko</option>
          <option value="vegan">Vegansko</option>
          <option value="meat">Mesno</option>
        </select>
      </label>

      <label>
  Sastojci (svaki u novi red):
  <textarea v-model="ingredientsInput" placeholder="npr. 800 g krumpira\n1 žlica soli" rows="6" required></textarea>
</label>


      <label>
        Slika jela:
        <input type="file" @change="handleImageUpload" accept="image/*" />
      </label>

      <button type="submit">✅ Spremi recept</button>

      <p v-if="successMessage" class="success-msg">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      recipe: {
        name: '',
        description: '',
        category: '',
        image: null,
      },
      ingredientsInput: '',
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    handleImageUpload(event) {
      this.recipe.image = event.target.files[0];
    },
    async submitRecipe() {
      const formData = new FormData();
      formData.append('name', this.recipe.name);
      formData.append('description', this.recipe.description);
      formData.append('category', this.recipe.category);
      if (this.recipe.image) {
        formData.append('image', this.recipe.image);
      }

      const ingredientsArray = this.ingredientsInput
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);

      formData.append('ingredients', JSON.stringify(ingredientsArray));

      try {
        await axios.post('http://localhost:3001/api/v1/recipes', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        this.successMessage = 'Recept uspješno dodan!';
        this.errorMessage = '';
        this.recipe.name = '';
this.recipe.description = '';
this.recipe.category = '';
this.recipe.image = null;

        this.ingredientsInput = '';

        this.$router.push('/home'); 
      } catch (err) {
        console.error('Greška pri dodavanju recepta:', err);
        this.errorMessage = 'Greška pri dodavanju recepta.';
        this.successMessage = '';
      }
    }
  }
};
</script>

<style scoped>
.add-recipe-page {
  max-width: 600px;
  margin: 2rem auto;
  background: #fffdf7;
  padding: 2rem;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', sans-serif;
}

.title {
  text-align: center;
  color: #e67e22;
  margin-bottom: 1.5rem;
}

.recipe-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.recipe-form label {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  color: #5d4037;
}

.recipe-form input,
.recipe-form select,
.recipe-form textarea {
  margin-top: 0.5rem;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  background-color: #ff9800;
  color: white;
  font-weight: bold;
  border: none;
  padding: 0.75rem;
  border-radius: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #fb8c00;
}

.success-msg {
  color: green;
  font-weight: bold;
  margin-top: 1rem;
}

.error-msg {
  color: red;
  font-weight: bold;
  margin-top: 1rem;
}
</style>
