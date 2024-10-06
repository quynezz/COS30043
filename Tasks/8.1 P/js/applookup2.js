const { createApp } = Vue;
const { createVuetify } = Vuetify;

const unitsData = [
    { name: "Amy", mark: '90' },
    { name: "Bill", mark: '80' },
    { name: "Casey", mark: '70' },
    { name: "David", mark: '60' },
    { name: "Kevin", mark: '50' },
    { name: "Axl", mark: '51' },
    { name: "Bard", mark: '52' },
    { name: "Kai", mark: '53' },
    { name: "Reya", mark: '54' },
    { name: "Lily", mark: '53' },
    { name: "Billy", mark: '52' },
    { name: "Malvin", mark: '51' },
    { name: "Zigg", mark: '50' },
    { name: "Sylas", mark: '49' },
    { name: "Lee", mark: '48' },
    { name: "Carl", mark: '47' },
    { name: "Dev", mark: '46' },
    { name: "Harry", mark: '45' },
    { name: "Patt", mark: '44' },
    { name: "Perry", mark: '43' },
    { name: "Larry", mark: '42' },
    { name: "Chris", mark: '41' },
    { name: "Travis", mark: '40' },
    { name: "Drake", mark: '39' },
    { name: "Kenrick", mark: '38' },
];

const app = createApp();
const vuetify = createVuetify();

app.component('app-lookup2', {
    components: {
        paginate: VuejsPaginateNext,
    },
    data: function() {
        return {
            currentPage: 5,
            units: unitsData
        }
    },
    template: `
   <div>
    <h1>Unit Descriptions</h1>
    <table class="table table-striped">
      <caption class="table-caption">List of Student Marks</caption>
      <thead>
        <tr>
          <th id="nameHeader" scope="col">Code</th>
          <th id="markHeader" scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="unit in getItems" :key="unit.name">
          <td headers="nameHeader">{{ unit.name }}</td>
          <td headers="markHeader">{{ unit.mark }}</td>
        </tr>
      </tbody>
    </table>
    <paginate
      :page-count="Math.ceil(units.length / 4)"
      :page-range="5"
      :margin-pages="1"
      :click-handler="clickCallback"
      :prev-text="'Prev Page'"
      :next-text="'Next Page'"
      :container-class="'pagination'"
      :active-class="'currentPage'"
      initial-page="5"
    >
    </paginate>
  </div>
    `,
    computed: {
        getItems: function() {
            let current = this.currentPage * 4; // 3 rows per page
            let start = current - 4;
            return this.units.slice(start, current);
        }
    },
    methods: {
        clickCallback: function(pageNum) {
            this.currentPage = Number(pageNum);
        }
    }
});

app.use(vuetify).mount('#app');
