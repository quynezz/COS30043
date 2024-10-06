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

    <!-- Welcome Message -->
    <div class="text-center mt-5 pt-4">
      <h2>Welcome, {{ currentUser.name }}!</h2>
    </div>

    <!-- Unit Lookup Section -->
    <div class="mt-5 pt-4">
      <h3 class="text-center">Unit Lookup</h3>
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="form-row">
            <div class="col-md-4 mb-3">
              <label for="strCode">Code:</label>
              <input type="text" class="form-control" id="strCode" v-model="fUnit.code">
            </div>
            <div class="col-md-4 mb-3">
              <label for="strDesc">Description:</label>
              <input type="text" class="form-control" id="strDesc" v-model="fUnit.desc">
            </div>
            <div class="col-md-4 mb-3">
              <label for="strType">Unit Type:</label>
              <select class="form-control" id="strType" v-model="fUnit.type" @change="resetPagination">
                <option value="">All</option>
                <option value="Core">Core</option>
                <option value="Software Development">Software Development</option>
                <option value="Systems Analysis">Systems Analysis</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Table to display paginated and filtered data -->
      <div class="row justify-content-center mt-3">
        <div class="col-md-8">
          <table class="table">
            <caption>List of Units</caption>
            <thead>
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Description</th>
                <th scope="col">Credit Points</th>
                <th scope="col">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="unit in paginatedUnits" :key="unit.Code">
                <td>{{ unit.Code }}</td>
                <td>{{ unit.Description }}</td>
                <td>{{ unit.Cp }}</td>
                <td>{{ unit.Type }}</td>
              </tr>
              <tr v-if="paginatedUnits.length === 0">
                <td colspan="4" class="text-center">No units found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div class="row justify-content-center mt-3">
        <div class="col-md-8">
          <paginate
            :page-count="getPageCount"
            :page-range="3"
            :margin-pages="1"
            :click-handler="clickCallback"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination justify-content-center'"
            :page-class="'page-item'"
            :page-link-class="'page-link'"
            :prev-class="'page-item'"
            :prev-link-class="'page-link'"
            :next-class="'page-item'"
            :next-link-class="'page-link'"
            :active-class="'active'"
          ></paginate>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import VuejsPaginateNext from 'vuejs-paginate-next';


export default {
  components: { paginate: VuejsPaginateNext },
  data() {
    return {
      fUnit: { code: '', desc: '', type: '' },
      units: [],
      perPage: 5,
      currentPage: 1
    };
  },
  computed: {
    currentUser() {
      return JSON.parse(localStorage.getItem('user')) || { name: 'Guest' };
    },
    filteredUnits() {
      let filtered = this.units.filter(unit => {
        return (
          (!this.fUnit.code || unit.Code.toLowerCase().includes(this.fUnit.code.toLowerCase())) &&
          (!this.fUnit.desc || unit.Description.toLowerCase().includes(this.fUnit.desc.toLowerCase()))
        );
      });
      
      if (this.fUnit.type) {
        filtered = filtered.filter(unit => unit.Type.toLowerCase() === this.fUnit.type.toLowerCase());
      }
      
      return filtered;
    },
    paginatedUnits() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      return this.filteredUnits.slice(startIndex, startIndex + this.perPage);
    },
    getPageCount() {
      return Math.ceil(this.filteredUnits.length / this.perPage);
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      this.$router.push('/login');
    },
    fetchUnits() {
      axios.get('http://localhost:8001/api/subjectinfo')
        .then(response => {
          this.units = response.data;
        })
        .catch(error => {
          console.error('Error fetching units:', error);
        });
    },
    clickCallback(pageNum) {
      this.currentPage = pageNum;
    },
    resetPagination() {
      this.currentPage = 1;
    }
  },
  mounted() {
    this.fetchUnits();
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
