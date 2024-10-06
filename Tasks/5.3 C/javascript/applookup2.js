var units = [
  {
    code: "ICT10001",
    desc: "Problem Solving with ICT",
    cp: 12.5,
    type: "Core",
  },
  { code: "COS10005", desc: "Web Development", cp: 12.5, type: "Core" },
  {
    code: "INF10003",
    desc: "Introduction to Business Information Systems",
    cp: 12.5,
    type: "Core",
  },
  {
    code: "INF10002",
    desc: "Database Analysis and Design",
    cp: 12.5,
    type: "Core",
  },
  {
    code: "COS10009",
    desc: "Introduction to Programming",
    cp: 12.5,
    type: "Core",
  },
  {
    code: "INF30029",
    desc: "Information Technology Project Management",
    cp: 12.5,
    type: "Core",
  },
  {
    code: "ICT30005",
    desc: "Professional Issues in Information Technology",
    cp: 12.5,
    type: "Core",
  },
  {
    code: "ICT30001",
    desc: "Information Technology Project",
    cp: 12.5,
    type: "Core",
  },
];

const Unit = {
  props: ["id"],
  data() {
    return { units };
  },

  template: `
      <div>
        <h2>Unit Code: {{ $route.params.id }}</h2>
        <ul v-for="unit in filteredUnits">
          <li>{{ unit.code }}</li>
          <li>{{ unit.desc }}</li>
          <li>{{ unit.cp }}</li>
          <li>{{ unit.type }}</li>
        </ul>
      </div>
    `,
    computed: {
      filteredUnits() {
        // Return only the unit with code matching the route parameter id
        return this.units.filter((unit) =>
          unit.code.toLowerCase().match(this.$route.params.id.toLowerCase()));
      }
    }
  };  


const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: "/unit/:id",
      component: Unit,
    },
  ],
});

const app = Vue.createApp({});

app.component("app-lookup2", {
  data() {
    return {
      units,
    };
  },

  template: `
      <div class="row">
        <div class="col-lg-12">
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Description</th>
                  <th>More Info</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="unit in units" :key="unit.code">
                  <td>{{ unit.code }}</td>
                  <td>{{ unit.desc }}</td>
                  <td><router-link :to="{ path: '/unit/' + unit.code }">Read More</router-link></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <router-view></router-view>
        </div>
      </div>
    `,
});

app.use(router);
app.mount("#app");
