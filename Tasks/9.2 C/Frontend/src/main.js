// main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS

createApp(App).use(router).mount('#app');
