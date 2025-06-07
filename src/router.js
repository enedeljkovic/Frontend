import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import Register from './views/Register.vue'
import Home from './views/Home.vue'
import AddRecipe from './views/AddRecipe.vue'
import RecipeDetails from './views/RecipeDetails.vue'  

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/add-recipe',
    name: 'AddRecipe',
    component: AddRecipe
  },
  {
    path: '/recipe/:id',
    name: 'RecipeDetails',
    component: RecipeDetails   
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
