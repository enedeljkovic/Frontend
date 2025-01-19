<template>
    <div class="home-container">
      <h1>InstaRecipe</h1>
      <p class="intro-text">Find your favorite recipes here.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage', // Ime komponente
  }
  </script>
  
  <style scoped>
  .home-container {
    display: flex;
    flex-direction: column;
    justify-content: center;  /* Vertikalno centriranje */
    align-items: justify;      /* Horizontalno centriranje */
    height: 100vh;            /* Visina ekrana */
    text-align: justify;       /* Centriranje teksta */
  }
  
  h1 {
    font-size: 3rem;
    color: #ff5722; /* Primarna boja */
    margin: 0;
  }
  
  .intro-text {
    font-size: 1.5rem;
    color: #444;
    margin-top: 20px;
  }
  </style>
  