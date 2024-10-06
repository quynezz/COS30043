<template>
    <div class="container mt-5">
    <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container">
          <div class="collapse navbar-collapse justify-content-end">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/update" class="nav-link">Update</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/delete" class="nav-link">Delete</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/insert" class="nav-link">Insert</router-link>
              </li>
              <li class="nav-item">
                <button @click="logout" class="btn btn-outline-danger btn-sm">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- Delete Unit Form -->
      <div class="mt-5 pt-5">
        <h3 class="text-center">Delete Unit</h3>
        <div class="row justify-content-center mt-3">
          <div class="col-md-6">
            <form @submit.prevent="deleteUnit">
              <div class="form-group">
                <label for="code">Code:</label>
                <input type="text" class="form-control" id="code" v-model="unit.code" required>
              </div>
              <button type="submit" class="btn btn-danger">Delete Unit</button>
            </form>
          </div>
        </div>
      </div>
  
      <!-- Status Table -->
      <div class="mt-5">
        <h4>Status Messages</h4>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Operation</th>
              <th>Status Code</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(message, index) in statusMessages" :key="index">
              <td>{{ message.operation }}</td>
              <td>{{ message.statusCode }}</td>
              <td>{{ message.message }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        unit: {
          code: ''
        },
        statusMessages: []
      };
    },
    methods: {
      async deleteUnit() {
        try {
          const response = await axios.delete(`http://localhost:8001/api/delete/${this.unit.code}`);
          this.unit.code = '';
          this.addStatusMessage('Delete', response.status, 'Unit deleted successfully!');
        } catch (error) {
          if (error.response && error.response.status === 404) {
            this.addStatusMessage('Delete', error.response.status, 'Unit does not exist. Cannot delete.');
          } else {
            this.handleError('Delete', error);
          }
        }
      },
      addStatusMessage(operation, statusCode, message) {
        this.statusMessages.unshift({ operation, statusCode, message });
      },
      handleError(operation, error) {
        const statusCode = error.response?.status || 'Error';
        const message = error.response?.data?.message || error.message;
        this.addStatusMessage(operation, statusCode, `Error: ${message}`);
        console.error(`Error during ${operation}:`, error);
      },
      logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  
  <style scoped>
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .navbar .navbar-nav .nav-item .nav-link {
    padding: 0.5rem 1rem;
  }
  
  .navbar .navbar-nav .nav-item button {
    margin-left: 1rem;
  }
  </style>
  