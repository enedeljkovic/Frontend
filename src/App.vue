<template>
  <div id="app">
    <header class="main-header">
      <h1>🍽️ InstaRecipe</h1>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
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
