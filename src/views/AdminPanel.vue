<template>
  <div class="admin-panel">
    <h1>👑 Admin Panel</h1>

    <button @click="logoutAdmin" class="logout-button">Odjava</button>

   
    <section>
      <h2>👥 Korisnici</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button @click="deleteUser(user.id)">Obriši</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

   
    <section>
      <h2>🍽️ Recepti</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Naziv</th>
            <th>Kategorija</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recipe in recipes" :key="recipe.id">
            <td>{{ recipe.id }}</td>
            <td>{{ recipe.name }}</td>
            <td>{{ recipe.category }}</td>
            <td>
              <button @click="deleteRecipe(recipe.id)">Obriši</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    
    <section>
      <h2>💬 Komentari</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Komentar</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="comment in comments" :key="comment.id">
            <td>{{ comment.id }}</td>
            <td>{{ comment.content }}</td>
            <td>
              <button @click="deleteComment(comment.id)">Obriši</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      recipes: [],
      comments: [],
      errorMessage: '',
      adminToken: localStorage.getItem('adminToken'),
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/users`, {
          headers: { Authorization: `Bearer ${this.adminToken}` },
        });
        this.users = res.data.users;
      } catch (err) {
        this.errorMessage = 'Ne mogu dohvatiti korisnike';
      }
    },
    async deleteUser(userId) {
      if (!confirm('Jeste li sigurni da želite obrisati korisnika?')) return;
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/user/${userId}`, {
          headers: { Authorization: `Bearer ${this.adminToken}` },
        });
        this.fetchUsers();
      } catch (err) {
        this.errorMessage = 'Greška pri brisanju korisnika';
      }
    },
    async fetchRecipes() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/recipes`, {
          headers: { Authorization: `Bearer ${this.adminToken}` },
        });
        this.recipes = res.data.recipes;
      } catch (err) {
        this.errorMessage = 'Ne mogu dohvatiti recepte';
      }
    },
    async deleteRecipe(recipeId) {
      if (!confirm('Jeste li sigurni da želite obrisati recept?')) return;
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/recipe/${recipeId}`, {
          headers: { Authorization: `Bearer ${this.adminToken}` },
        });
        this.fetchRecipes();
      } catch (err) {
        this.errorMessage = 'Greška pri brisanju recepta';
      }
    },
    async fetchComments() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/comments`, {
          headers: { Authorization: `Bearer ${this.adminToken}` },
        });
        this.comments = res.data.comments;
      } catch (err) {
        this.errorMessage = 'Ne mogu dohvatiti komentare';
      }
    },
    async deleteComment(commentId) {
      if (!confirm('Jeste li sigurni da želite obrisati komentar?')) return;
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/comment/${commentId}`, {
          headers: { Authorization: `Bearer ${this.adminToken}` },
        });
        this.fetchComments();
      } catch (err) {
        this.errorMessage = 'Greška pri brisanju komentara';
      }
    },
    logoutAdmin() {
      localStorage.removeItem('adminToken');
      this.$router.push('/admin-login');
    }
  },
  mounted() {
    this.fetchUsers();
    this.fetchRecipes();
    this.fetchComments();
  }
};
</script>

<style scoped>
.admin-panel {
  padding: 2rem;
  max-width: 1100px;
  margin: auto;
  background: #fefefe;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

section {
  margin-bottom: 2.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  border: 1px solid #ddd;
  padding: 0.8rem;
  text-align: left;
}

th {
  background-color: #ffa726;
  color: white;
}

button {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #d32f2f;
}

.logout-button {
  float: right;
  background-color: #607d8b;
  margin-bottom: 1rem;
}

.error {
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 2rem;
}
</style>
