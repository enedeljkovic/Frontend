<template>
  <div class="home-container">
    <h1>Dobrodošli!</h1>
    <p>Ovo je početna stranica vaše Recipe App aplikacije.</p>
    
    <router-link to="/profile" class="profile-button">
      ➤ Idi na profil
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background-color: #f8f9fa;
  padding: 2rem;
  text-align: center;
  border-radius: 12px;
}

h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.profile-button {
  background-color: #42b983;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.profile-button:hover {
  background-color: #369b6d;
}
</style>
