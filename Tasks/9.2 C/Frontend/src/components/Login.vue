<template>
  <div>
    <app-2></app-2>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow-lg">
            <div class="card-body p-4">
              <h2 class="card-title text-center mb-4">Login</h2>
              <form @submit.prevent="login" class="needs-validation" novalidate>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    v-model="email"
                    class="form-control form-control-lg"
                    :class="{ 'is-invalid': formSubmitted && !email }"
                    required
                  />
                  <div v-if="formSubmitted && !email" class="text-danger">Please enter your email</div>
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
                </div>
                <button type="submit" class="btn btn-primary btn-lg w-100">Login</button>
                <small v-if="loginError.general" class="text-danger mt-2 d-block text-center">{{ loginError.general }}</small>
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
import App2 from '@/App2.vue';
export default {
  components: { App2 },
  data() {
    return {
      email: '',
      password: '',
      loginError: {
        general: ''
      },
      formSubmitted: false
    };
  },
  methods: {
    async login() {
      this.formSubmitted = true;
      
      if (!this.email || !this.password) {
        return;
      }

      try {
        const response = await axios.post('http://localhost:8001/login', {
          email: this.email,
          password: this.password
        }); 
        // Navigation after successfully login
        if (response.status === 200) {
          alert(response.data.message)
          localStorage.setItem('accessToken', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          this.$router.push('/dashboard');
        } else {
          this.loginError.general = error.response.data.error;
        }
      } catch (error) {
        console.error('Login error:', error.response.data);
        // Return general errors from Axios library
        this.loginError.general = error.response.data.error || 'Login failed';
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
