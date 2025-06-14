<template>
  <div class="register-container">
    <h1>🍽️ Registracija</h1>
    <form @submit.prevent="register" class="register-form">
      <div class="form-group">
        <label for="username">Korisničko ime:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Unesite korisničko ime"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Unesite email"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Lozinka:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Unesite lozinku"
          required
        />
      </div>

      <button type="submit" class="register-button">Registriraj se</button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </form>
    <p>Već imate račun? <router-link to="/">Prijavite se</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('${import.meta.env.VITE_API_BASE_URL}/api/v1/register', {
          username: this.username,
          email: this.email,
          password: this.password
        });

        if (response.status === 201) {
          this.successMessage = 'Registracija uspješna! Možete se prijaviti.';
          this.errorMessage = '';
          this.username = '';
          this.email = '';
          this.password = '';
        }
      } catch (error) {
        console.error('Greška pri registraciji:', error);
        this.successMessage = '';
        this.errorMessage = error.response?.data?.message || 'Došlo je do greške.';
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  max-width: 450px;
  margin: 80px auto;
  padding: 2rem;
  background: linear-gradient(135deg, #fdf6e3, #fef9f2);
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 1px solid #ffd8a8;
}

h1 {
  color: #e67e22;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.register-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1.2rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 600;
  color: #6d4c41;
}

input {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
}

input:focus {
  border-color: #ffb74d;
  outline: none;
  box-shadow: 0 0 5px rgba(255, 183, 77, 0.5);
}

.register-button {
  margin-top: 1rem;
  padding: 0.8rem;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.register-button:hover {
  background-color: #fb8c00;
}

.error {
  color: red;
  margin-top: 1rem;
  font-weight: 500;
}

.success {
  color: green;
  margin-top: 1rem;
  font-weight: 500;
}
</style>
