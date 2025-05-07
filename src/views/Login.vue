<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      login() {
        console.log('Pokušavam prijaviti korisnika...'); 
        if (this.email && this.password) {
          console.log('Prijava uspješna!');
          localStorage.setItem('auth_token', 'dovršenToken'); 
          this.$router.push('/profile');  
        } else {
          console.log('Pogrešni podaci za prijavu');
          alert('Molimo unesite ispravne podatke!');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Stiliziraj login formu prema potrebi */
  </style>
  