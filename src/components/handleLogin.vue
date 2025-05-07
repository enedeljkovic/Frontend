<template>
    <div id="login">
      <h1>Prijava</h1>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" id="email" required />
        </div>
        <div>
          <label for="password">Lozinka:</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit">Prijavi se</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useRouter } from 'vue-router';  
  
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
          const response = await axios.post('http://localhost:3001/api/v1/login', {
            email: this.email,
            password: this.password,
          });
  
          if (response.data.token) {
            
            localStorage.setItem('user-token', response.data.token);
            console.log('Prijava uspješna!', response.data);
  
            
            this.$router.push('/dashboard');  
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
  #error {
    color: red;
  }
  </style>
  