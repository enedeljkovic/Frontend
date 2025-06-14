import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import Register from './views/Register.vue'
import Home from './views/Home.vue'
import AddRecipe from './views/AddRecipe.vue'
import RecipeDetails from './views/RecipeDetails.vue'  
import LoginAdmin from './views/LoginAdmin.vue';
import AdminPanel from './views/AdminPanel.vue';

const routes = [
  {
  path: '/',
  redirect: '/login'
},
  {
    path: '/login',
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
  },
  {
    path: '/admin-login',
    name: 'AdminLogin',
    component: LoginAdmin
  },
  {
  path: '/admin-panel',
  name: 'AdminPanel',
  component: AdminPanel
}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
