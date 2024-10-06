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
  
      <!-- Insert Unit Form -->
      <div class="mt-5 pt-5">
        <h3 class="text-center">Insert New Unit</h3>
        <div class="row justify-content-center mt-3">
          <div class="col-md-6">
            <form @submit.prevent="insertUnit">
              <div class="form-group mb-3">
                <label for="code" class="mb-2">Code:</label>
                <input type="text" class="form-control" id="code" v-model="newUnit.code" required>
              </div>
              <div class="form-group mb-3">
                <label for="description" class="mb-2">Description:</label>
                <input type="text" class="form-control" id="description" v-model="newUnit.description" required>
              </div>
              <div class="form-group mb-3">
                <label for="cp" class="mb-2">Credit Points:</label>
                <input type="text" class="form-control" id="cp" v-model="newUnit.cp" disabled>
                <!-- Display the fixed value -->
              </div>
              <div class="form-group mb-3">
                <label for="type" class="mb-2">Unit Type:</label>
                <select class="form-control" id="type" v-model="newUnit.type" required>
                  <option value="Core">Core</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Systems Analysis">Systems Analysis</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Insert Unit</button>
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
        newUnit: {
          code: '',
          description: '',
          cp: 12.5, // Set default value to 12.5
          type: ''
        },
        statusMessages: []
      };
    },
    methods: {
      insertUnit() {
        axios.get(`http://localhost:8001/api/check/${this.newUnit.code}`)
          .then(response => {
            if (response.data.exists) {
              this.statusMessages.unshift({
                operation: 'Insert',
                statusCode: 409,
                message: 'Unit already exists in the database. Cannot insert.'
              });
            } else {
              axios.post('http://localhost:8001/api/insert', this.newUnit)
                .then(response => {
                  this.newUnit = { code: '', description: '', cp: 12.5, type: '' }; // Reset fields after insertion
                  this.statusMessages.unshift({
                    operation: 'Insert',
                    statusCode: response.status,
                    message: 'Unit inserted successfully!'
                  });
                })
                .catch(error => {
                  this.statusMessages.unshift({
                    operation: 'Insert',
                    statusCode: error.response.status || 'Error',
                    message: 'Error inserting unit: ' + error.message
                  });
                  console.error('Error inserting unit:', error);
                });
            }
          })
          .catch(error => {
            this.statusMessages.unshift({
              operation: 'Insert',
              statusCode: error.response.status || 'Error',
              message: 'Error checking unit existence: ' + error.message
            });
            console.error('Error checking unit existence:', error);
          });
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