<template>
  <div>
    <h2 class="mt-4">Tasks</h2>
    <!-- Input form -->
    <div class="mb-4 d-flex justify-content-center">
      <div class="input-group" style="max-width: 400px">
        <input
          id="statusInput"
          v-model="strStatus"
          type="text"
          class="form-control"
        />
        <div class="input-group-append">
          <button @click="add(strStatus)" class="btn btn-primary">Post</button>
        </div>
      </div>
    </div>
    <!-- Display posts -->
    <div class="card mb-3" v-for="(post, index) in statPosts" :key="index">
      <div
        class="card-body p-3 d-flex align-items-center justify-content-between"
        :class="{ 'bg-light': selectedIndex === index }"
        @click="select(index)"
      >
        <div class="d-flex align-items-center">
          <img
            src="../assets/sea.jpg"
            alt="User Icon"
            class="rounded-circle mr-3"
            style="width: 48px; height: 48px"
          />
        </div>
        <div class="flex-grow-1 ml-3">
          <p class="card-text mb-0">{{ post.message }}</p>
        </div>
        <div>
          <button @click="remove(index)" class="btn btn-sm btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statPosts: [],
      strStatus: "",
      selectedIndex: -1,
    };
  },
  methods: {
    add(status) {
      if (status.trim()) {
        this.statPosts.push({
          message: status,
        });
        this.strStatus = "";
        this.selectedIndex = -1;
      }
    },
    remove(index) {
      this.statPosts.splice(index, 1);
      if (this.selectedIndex === index) {
        this.selectedIndex = -1;
      }
    },
    select(index) {
      this.selectedIndex = index;
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 600px;
  margin: 0 auto;
}
.form-control {
  width: 100%; 
  max-width: 400px; 
  margin: 0 auto; 
}
</style>