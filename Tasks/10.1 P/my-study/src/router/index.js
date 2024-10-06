import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Tasks from '@/components/Tasks.vue';
import Units from '@/components/Units.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/units',
    name: 'Units',
    component: Units
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
