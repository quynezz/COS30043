<template>
    <div class="container mt-4">
      <img src="../assets/mountain.jpg" alt="My Image" class="img-fluid">
      <h1></h1>
      <h2 class="text-center mb-4">Home</h2>
      <div class="row justify-content-center">
        <div class="col-md-5">
          <div class="card p-3">
            <div class="form-group text-center">
              <label for="firstName">First Name:</label>
              <input id="firstName" v-model="firstName" type="text" class="form-control form-control-sm" placeholder="Enter your first name" required>
            </div>
            <div class="form-group text-center">
              <label for="lastName">Last Name:</label>
              <input id="lastName" v-model="lastName" type="text" class="form-control form-control-sm" placeholder="Enter your last name" required>
            </div>
            <p class="text-center mb-3">Welcome, <strong>{{ fullName }}</strong>!</p>
  
            <div class="form-group text-center">
              <label>Select an Image:</label>
              <div class="form-check form-check-inline">
                <input type="radio" id="mountain" value="mountain" v-model="selectedImage">
                <label for="mountain">Moutain</label>
              </div>
              <div class="form-check form-check-inline">
                <input type="radio" id="ocean" value="ocean" v-model="selectedImage" >
                <label for="ocean">Ocean</label>
              </div>
            </div>
            <div v-if="selectedImage" class="mt-3 text-center">
              <img :src="getImageSrc()" alt="Selected Image" class="img-fluid">
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import mountainImage from '../image/mountain.png';
  import oceanImage from '../image/sea.jpg';
  
  export default {
    name: 'Home',
    data() {
      return {
        firstName: '',
        lastName: '',
        selectedImage: ''
      };
    },
    computed: {
      fullName() {
        return this.firstName + " " +  this.lastName;
      }
    },
    methods: {
      getImageSrc() {
        if (this.selectedImage === 'mountain') {
          return mountainImage;
        } else if (this.selectedImage === 'ocean') {
          return oceanImage;
        }
        return '';
      },
    }
  };
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 1rem;
  }
  .form-control {
    padding: 0.375rem 0.75rem;
  }
  .form-check-label {
    margin-bottom: 0;
  }
  </style>
  