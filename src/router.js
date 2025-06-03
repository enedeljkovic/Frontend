import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import Register from './views/Register.vue'
import Home from './views/Home.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
