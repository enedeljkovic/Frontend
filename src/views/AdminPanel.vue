<template>
  <div class="admin-panel">
    <h1>👨‍💼 Admin Panel</h1>

    <section>
      <h2>Korisnici</h2>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.email }}
          <button @click="deleteUser(user.id)">Obriši</button>
        </li>
      </ul>
    </section>

    <section>
      <h2>Recepti</h2>
      <ul>
        <li v-for="recipe in recipes" :key="recipe.id">
          {{ recipe.name }}
          <button @click="deleteRecipe(recipe.id)">Obriši</button>
        </li>
      </ul>
    </section>

    <section>
      <h2>Komentari</h2>
      <ul>
        <li v-for="comment in comments" :key="comment.id">
          {{ comment.content }}
          <button @click="deleteComment(comment.id)">Obriši</button>
        </li>
      </ul>
    </section>

    <section>
      <h2>Zamjene sastojaka</h2>
      <ul>
        <li v-for="sub in substitutions" :key="sub.id">
          {{ sub.ingredient }} → {{ sub.substitute }}
          <button @click="deleteSubstitution(sub.id)">Obriši</button>
        </li>
      </ul>
    </section>
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
      substitutions: []
    };
  },
  async mounted() {
    const token = localStorage.getItem('adminToken');
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const [users, recipes, comments, substitutions] = await Promise.all([
        axios.get('http://localhost:3001/api/v1/admin/users', { headers }),
        axios.get('http://localhost:3001/api/v1/admin/recipes', { headers }),
        axios.get('http://localhost:3001/api/v1/admin/comments', { headers }),
        axios.get('http://localhost:3001/api/v1/admin/substitutions', { headers })
      ]);
      this.users = users.data.users;
      this.recipes = recipes.data.recipes;
      this.comments = comments.data.comments;
      this.substitutions = substitutions.data.substitutions;
    } catch (err) {
      console.error('Greška pri dohvaćanju admin podataka:', err);
    }
  },
  methods: {
    async deleteUser(id) {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:3001/api/v1/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.users = this.users.filter(u => u.id !== id);
    },
    async deleteRecipe(id) {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:3001/api/v1/admin/recipe/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.recipes = this.recipes.filter(r => r.id !== id);
    },
    async deleteComment(id) {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:3001/api/v1/admin/comment/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.comments = this.comments.filter(c => c.id !== id);
    },
    async deleteSubstitution(id) {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:3001/api/v1/admin/substitution/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.substitutions = this.substitutions.filter(s => s.id !== id);
    }
  }
};
</script>

<style scoped>
.admin-panel {
  max-width: 1000px;
  margin: 2rem auto;
  font-family: 'Segoe UI', sans-serif;
}
section {
  margin-top: 2rem;
}
h2 {
  color: #e67e22;
}
button {
  margin-left: 1rem;
  background-color: #e74c3c;
  color: white;
  padding: 0.3rem 0.8rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
