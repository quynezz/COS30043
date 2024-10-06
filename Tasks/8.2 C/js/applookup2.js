var readJsonURL = "lookup-data.json"; // json file location

const { createApp } = Vue;
const { createVuetify } = Vuetify;
const app = createApp();
const vuetify = createVuetify();

app.component(
  "app-lookup2", // indicating the component tag
  {
    components: {
      paginate: VuejsPaginateNext,
    },

    // defining data to be used in the component
    data: function () {
      return {
        perPage: 5, // show 5 rows at a time
        currentPage: 1,
        fUnit: {
          code: "",
          desc: "",
          cp: "",
          type: " ",
        },
        units: [],
      };
    },

    // store data from JSON file to units after the component has been mounted
    mounted() {
      var self = this;
      $.getJSON(readJsonURL, function (data) {
        self.units = data;
      });
    },
    // define the template for the component
    template: `
      <div>
        <v-row>
          <v-col cols="12" md="12">
            <v-card class="mx-auto" max-width="90%">
              <v-card-title>
                <h1>Lookup App: Unit Search Filter</h1>
              </v-card-title>
              <v-card-text>
                <v-form>
                  <v-row>
                    <v-col cols="12" md="4">
                      <p>
                        <label for="strCode">Code:</label><br>
                        <v-text-field id="strCode" v-model.trim="fUnit.code" />
                      </p>
                    </v-col>
                    <v-col cols="12" md="4">
                      <p>
                        <label for="strDesc">Description:</label><br>
                        <v-text-field id="strDesc" v-model.trim="fUnit.desc" />
                      </p>
                    </v-col>
                    <v-col cols="12" md="4">
                      <label>Unit Type:</label><br />
                      <v-radio-group v-model="fUnit.type">
                        <v-radio label="Core" value="Core"></v-radio>
                        <v-radio label="Software Development" value="Software Development"></v-radio>
                        <v-radio label="Systems Analysis" value="Systems Analysis"></v-radio>
                        <v-radio label="All" value=" "></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-card class="mx-auto" max-width="90%">
              <v-row>
                <v-col md="12" cols="12">
                  <v-card-text>
                    <v-table>
                      <caption>List of Units</caption>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th id="thCode" scope="col">Code</th>
                            <th id="thDesc" scope="col">Description</th>
                            <th id="thCP" scope="col">Credit Points</th>
                            <th id="thType" scope="col">Type</th>
                            <th id="thType" scope="col">Extra</th>

                          </tr>
                        </thead>
                        <!-- Using v-for to loop units and list them -->
                        <tbody>
                          <tr v-for="unit in getItems" :key="unit.code">
                            <td headers="thCode">{{ unit.code }}</td>
                            <td headers="thDesc">{{ unit.desc }}</td>
                            <td headers="thCP">{{ unit.cp }}</td>
                            <td headers="thType">{{ unit.type }}</td>
                            <td headers="thType">{{ unit.extra }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-table>
                  </v-card-text>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <!-- Vue Paginate template -->

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
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>
    `,
    computed: {
      // function that filters the units according to the search fields
      filteredUnits: function () {
        return this.units.filter(
          (unit) =>
            unit.code.toLowerCase().includes(this.fUnit.code.toLowerCase()) &&
            unit.desc.toLowerCase().includes(this.fUnit.desc.toLowerCase()) &&
            unit.type.includes(this.fUnit.type.trim())
        );
      },
      // returns the data according to the page number
      getItems: function () {
        let current = this.currentPage * this.perPage;
        let start = current - this.perPage;
        return this.filteredUnits.slice(start, current);
      },
      // returns total number of pages required according to the total rows of data
      getPageCount: function () {
        return Math.ceil(this.filteredUnits.length / this.perPage);
      },
    },
    methods: {
      // sets the clicked page
      clickCallback: function (pageNum) {
        this.currentPage = Number(pageNum);
      },
    },
  }
);

app.use(vuetify).mount("#app");
