<template>
  <div id="app">
    <div class="background">
      <header class="main-header">
        <h1>🍽️ InstaRecipe</h1>
      </header>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

.background {
  background-image: url('/images/background.png'); 
  background-size: cover;
  background-repeat: repeat;
  background-attachment: fixed;
  min-height: 100vh;
}


.content {
  background-color: rgba(255, 255, 255, 0.7); 
  min-height: calc(100vh - 80px);
  padding: 2rem;
}



.main-header {
  background-color: #fff4e6;
  padding: 1rem;
  text-align: center;
  border-bottom: 2px solid #ffe0b2;
}

.main-header h1 {
  margin: 0;
  font-size: 2rem;
  color: #e67e22;
  font-weight: bold;
}
</style>
