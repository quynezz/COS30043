<template>
  <div>
    <app-2></app-2>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow-lg">
            <div class="card-body p-4">
              <h2 class="card-title text-center mb-4">Register</h2>
              <form @submit.prevent="register" class="needs-validation" novalidate>
                <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    v-model="name"
                    class="form-control form-control-lg"
                    :class="{ 'is-invalid': formSubmitted && !name }"
                    required
                  />
                  <div v-if="formSubmitted && !name" class="text-danger">Please enter your name</div>
                  <div v-if="nameError" class="text-danger">Username already exists.</div>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    v-model="email"
                    class="form-control form-control-lg"
                    :class="{ 'is-invalid': formSubmitted && (!email || emailformatError || emailError) }"
                    @input="validateEmailFormat"
                    required
                  />
                  <div v-if="formSubmitted && !email" class="text-danger">Please enter your email</div>
                  <div v-if="emailformatError" class="text-danger">Please enter a valid email</div>
                  <div v-if="emailError" class="text-danger">Email is already taken</div>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    v-model="password"
                    class="form-control form-control-lg"
                    :class="{ 'is-invalid': formSubmitted && !password }"
                    required
                  />
                  <div v-if="formSubmitted && !password" class="text-danger">Password is required</div>
                  <div v-if="passwordError" class="text-danger">Password must be at least 8 characters long, contain at least one uppercase letter, and one special character.</div>
                </div>
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    class="form-control form-control-lg"
                    :class="{ 'is-invalid': formSubmitted && !confirmPassword }"
                    required
                  />
                  <div v-if="formSubmitted && !confirmPassword" class="text-danger">Please confirm your password</div>
                  <div v-if="confirmPasswordError" class="text-danger">Passwords do not match.</div>
                </div>
                <button type="submit" class="btn btn-primary btn-lg w-100">Register</button>
                <small v-if="registerError" class="text-danger mt-2 d-block text-center">{{ registerError }}</small>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import App2 from '../App2.vue';

export default {
  components: { App2 },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      nameError: false,
      emailError: false,
      emailformatError: false,
      passwordError: false,
      confirmPasswordError: false,
      registerError: '',
      formSubmitted: false
    };
  },
  methods: {
    async register() {
      this.formSubmitted = true;
      
      try {
        // Validate empty fields
        if (!this.name || !this.email || !this.password || !this.confirmPassword) {
          this.registerError;
          return;
        }

        // Validate email format
        if (!this.validateEmail(this.email)) {
          this.emailformatError = true;
          this.emailError = false; // Clear emailError if format is incorrect
          return;
        } else {
          this.emailformatError = false;
        }

        // Validate password complexity
        if (!this.validatePassword(this.password)) {
          this.passwordError = true;
          return;
        } else {
          this.passwordError = false;
        }

        // Validate password match
        if (this.password !== this.confirmPassword) {
          this.confirmPasswordError = true;
          return;
        } else {
          this.confirmPasswordError = false;
        }

        // Check if the user exists
        const checkResponse = await axios.get('http://localhost:8001/api/check-user', {
          params: { name: this.name, email: this.email }
        });

        if (checkResponse.data.exists.username) {
          this.nameError = true;
          return;
        } else {
          this.nameError = false;
        }

        if (checkResponse.data.exists.email) {
          this.emailError = true;
          return;
        } else {
          this.emailError = false;
        }

        // If all validations pass, attempt registration
        const response = await axios.post('http://localhost:8001/register', {
          name: this.name,
          email: this.email,
          password: this.password
        });

        if (response.status === 200) {
          alert(response.data.message); // Show success message
          this.registerError = ''; // Clear any existing error message
          this.$router.push('/login'); // Redirect to login page after successful registration
        } else {
          this.registerError = response.data.error;
        }
      } catch (error) {
        console.error('Registration error:', error.response.data);
        this.registerError = error.response.data.error || 'Registration failed';
      }
    },

    validateEmail(email) {
      // Simple email validation using regex
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    },

    validatePassword(password) {
      // Password complexity validation
      const re = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.{8,})/;
      return re.test(String(password));
    },

    validateEmailFormat() {
      if (!this.email) {
        this.emailformatError = false;
        this.emailError = false;
        return;
      }

      if (!this.validateEmail(this.email)) {
        this.emailformatError = true;
        this.emailError = false; // Clear emailError if format is incorrect
      } else {
        this.emailformatError = false;
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  text-align: center;
}
.card {
  border-radius: 1rem;
}
.card-body {
  padding: 2rem;
}
</style>
