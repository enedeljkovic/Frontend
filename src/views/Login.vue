<template>
  <div class="login-container">
    <h1>🍲 Prijava</h1>
    <form @submit.prevent="handleLogin" class="login-form">
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

      <button type="submit" class="login-button">Prijavi se</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>

    <p class="register-link">
      Nemate račun? <router-link to="/register">Registrirajte se ovdje</router-link>
    </p>

    <p class="admin-link">
      Jeste li administrator? <router-link to="/admin-login">Prijava za admina</router-link>
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
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/login`, {
          email: this.email,
          password: this.password,
        });

        if (response.data.token) {
          localStorage.setItem('user-token', response.data.token);
          this.$router.push('/profile');
        }
      } catch (error) {
        console.error('Greška pri prijavi', error);
        this.errorMessage = 'Neispravni podaci za prijavu!';
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
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

.login-form {
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

.login-button {
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

.login-button:hover {
  background-color: #fb8c00;
}

.error {
  color: red;
  margin-top: 1rem;
  font-weight: 500;
}

.register-link,
.admin-link {
  margin-top: 1.2rem;
  font-size: 0.95rem;
  color: #6d4c41;
}

.register-link a,
.admin-link a {
  color: #ff9800;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s;
}

.register-link a:hover,
.admin-link a:hover {
  color: #fb8c00;
}
</style>
