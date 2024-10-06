<template>
    <div>
      <h2 class="mt-4">Units</h2>
      <div class="container">
        <table class="table table-striped">
          <caption>List of Units</caption>
          <thead class="thead-dark">
            <tr>
              <th scope="col">Code</th>
              <th scope="col">Description</th>
              <th scope="col">Credit Points</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="unit in units" :key="unit.Code">
              <td>{{ unit.Code }}</td>
              <td>{{ unit.desc }}</td>
              <td>{{ unit.cp }}</td>
              <td>{{ unit.type }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import Units from '../assets/units.json';
  
  export default {
    name: 'Units',
    data() {
      return {
        units: Units
      };
    }
  };
  </script>
  
  <style scoped>
  </style>
  