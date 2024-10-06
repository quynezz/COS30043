<template>
    <div id="app">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav ms-auto">
              <li v-if="!isLoggedIn" class="nav-item">
                <router-link to="/login" class="nav-link">Login</router-link>
              </li>
              <li v-if="!isLoggedIn" class="nav-item">
                <router-link to="/register" class="nav-link">Register</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>  
    </div>
  </template>
  
  <script>
  export default {
    name: 'App2',
    computed: {
      isLoggedIn() {
        return localStorage.getItem('accessToken') !== null;
      }
    },
  };
  </script>
  
  <style>
  #app {
    font-family: Arial, Helvetica, sans-serif;
  }
  </style>
  