const StringTest = {
  data() {
    return {
      strName: "",
    };
  },
  template: ` <div >
        <h1 class="text-center">String Test</h1>
        <div class="form-group">
        <label for="name">Please enter your name: </label>
        <input class="form-control" type="text" name="name" id="name" v-model="strName">
        <p v-if="strName.toLowerCase() == 'thang'">Awesome name!</p>
        <p v-else-if="strName==''"></p>
        <p v-else>{{strName}} is not my name!</p>
        </div>
    </div>`,
};

const MyPost = {
  data() {
    return {
      statPosts: [],
      strStatus: "",
      errors: [],
    };
  },
  template: `<div>
        <h2 class="text-center">Status Post App</h2>
        <div class="form-group">
          <label for="post">Status</label>
          <input type="text" class="form-control mt-2" name="post" id="post" v-model="strStatus" />
        </div>
        <button class="btn btn-success m-2" @click="add(strStatus)">Post</button>
        <div v-if="errors.length">
          <ul>
            <li>{{ errors[0] }}</li>
          </ul>
        </div>
        <p v-for="(post, index) in statPosts" :key="index">
          {{ post }}
          <button class="btn btn-warning " @click="remove(index)">Del</button>
        </p>
      </div>`,

  methods: {
    add: function (status) {
      if (this.strStatus.trim() !== "") {
        this.statPosts.push(status);
        this.strStatus = "";
        this.errors = [];
      } else if (this.errors.length === 0) {
        this.errors.push("Please enter status");
      }
    },
    remove: function (index) {
      this.statPosts.splice(index, 1);
    },
  },
};

const StudentMark = {
  components: {
    paginate: VuejsPaginateNext,
  },
  template: ` <h2  class="text-center">Student Marks</h2>
        <div class="row">
          <div class="table-reponsive">
            <table class="table">
            <thead>
                <tr>
                  <th scope="col" id="st-name">Student Name</th>
                  <th scope="col" id="st-marks">Marks</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in getItems" :key="item.name">
                  <td headers="st-name">{{item.name}}</td>
                  <td headers="st-marks">{{item.mark}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
       <paginate
          :page-count="getPageCount"
          :page-range="3"
          :margin-pages="1"
          :click-handler="clickCallback"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'page-item'"
          :page-link-class="'page-link'"
          :prev-class="'page-item'"
          :next-class="'page-item'"
          :prev-link-class="'page-link'"
          :next-link-class="'page-link'"
          class="pagination justify-content-center"
        >
        </paginate>`,
  data() {
    return {
      mark: [
        { name: "Amy", mark: 90 },
        { name: "Bill", mark: 80 },
        { name: "Casey", mark: 78 },
        { name: "David", mark: 84 },
        { name: "Emma", mark: 88 },
        { name: "Frank", mark: 76 },
        { name: "Grace", mark: 92 },
        { name: "Hannah", mark: 81 },
        { name: "Ivy", mark: 85 },
        { name: "Jack", mark: 79 },
        { name: "Katie", mark: 91 },
        { name: "Liam", mark: 77 },
        { name: "Mia", mark: 89 },
        { name: "Nina", mark: 82 },
        { name: "Oscar", mark: 86 },
        { name: "Paul", mark: 74 },
        { name: "Quinn", mark: 83 },
        { name: "Rachel", mark: 87 },
        { name: "Sam", mark: 75 },
        { name: "Tina", mark: 93 },
        { name: "Uma", mark: 80 },
        { name: "Victor", mark: 78 },
        { name: "Wendy", mark: 84 },
        { name: "Xander", mark: 76 },
        { name: "Yara", mark: 90 },
        { name: "Zach", mark: 88 },
      ],
      currentPage: 1,
      perPage: 3,
    };
  },
  computed: {
    getItems() {
      let current = this.currentPage * this.perPage;
      let start = current - this.perPage;
      return this.mark.slice(start, current);
    },
    getPageCount() {
      return Math.ceil(this.mark.length / this.perPage);
    },
  },
  methods: {
    clickCallback(pageNum) {
      this.currentPage = Number(pageNum);
    },
  },
};
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: StringTest,
    },
    {
      path: "/string-test",
      component: StringTest,
    },
    {
      path: "/post-management",
      component: MyPost,
    },
    {
      path: "/student-mark",
      component: StudentMark,
    },
  ],
});

const app = Vue.createApp({});
app.component("nav-bar", {
  template: `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active mr-3">
            <router-link to="string-test" class="nav-link">String Test</router-link>
          </li>
          <li class="nav-item mr-3">
            <router-link to="post-management" class="nav-link">Post Management</router-link>
          </li>
          <li class="nav-item">
            <router-link to="student-mark" class="nav-link">Student Mark</router-link>
          </li>
        </ul>
      </div>
    </nav>
  `,
});

app.use(router);
app.mount("#app");
