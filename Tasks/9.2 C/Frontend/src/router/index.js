import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import Dashboard from '@/components/Dashboard.vue';
import Insert from '@/components/Insert.vue';
import Update from '@/components/Update.vue';
import Delete from '@/components/Delete.vue';
import Register from '@/components/Register.vue'; 

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/insert',
    name: 'insert',
    component: Insert,
    meta: { requiresAuth: true }
  },
  {
    path: '/update',
    name: 'update',
    component: Update,
    meta: { requiresAuth: true }
  },
  {
    path: '/delete',
    name: 'delete',
    component: Delete,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('accessToken') !== null;
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
