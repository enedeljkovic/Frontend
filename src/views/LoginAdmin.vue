<template>
  <div class="admin-login">
    <h2>Admin Login</h2>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input v-model="email" type="email" required />

      <label for="password">Lozinka:</label>
      <input v-model="password" type="password" required />

      <button type="submit">Prijavi se</button>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <p class="back-link">
      👤 Natrag na <router-link to="/login">korisničku prijavu</router-link>
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/login`, {
          email: this.email,
          password: this.password
        });

        const token = res.data.token;
        localStorage.setItem('adminToken', token);
        this.$router.push('/admin-panel');
      } catch (err) {
        console.error('Greška pri prijavi:', err);
        this.errorMessage = 'Pogrešan email ili lozinka';
      }
    }
  }
};
</script>

<style scoped>
.admin-login {
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

label {
  display: block;
  margin: 1rem 0 0.5rem;
  text-align: left;
}

input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: #f57c00;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 1rem;
}

.back-link {
  margin-top: 1.5rem;
  font-size: 0.95rem;
}

.back-link a {
  color: #f57c00;
  text-decoration: none;
  font-weight: bold;
}
</style>
