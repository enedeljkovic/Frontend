<template>
    <div>
      <h1>Prijava</h1>
      <form @submit.prevent="login">
        <input type="text" v-model="email" placeholder="Unesite email" />
        <input type="password" v-model="password" placeholder="Unesite lozinku" />
        <button type="submit">Prijavite se</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      login() {
        console.log('Pokušavam prijavu', this.email, this.password);  
  
        if (this.email && this.password) {
          
          console.log('Prijava uspješna');
          
          localStorage.setItem('auth_token', 'dovršenToken');
          this.$router.push('/profile'); 
        } else {
          console.log('Pogrešni podaci za prijavu');
          alert('Molimo unesite ispravne podatke!');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  