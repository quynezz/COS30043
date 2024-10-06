const app = Vue.createApp({
  data() {
    return {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirm: "",
      email: "",
      address: "",
      suburb: "",
      postcode: "",
      phone: "",
      errors: {},
      isValid: true,
      detailAreVisible: false,
      agree: false, // Added agree property for terms and conditions
    };
  },
  methods: {
    submitForm(event) {
      this.errors = {};
      this.isValid = true; // Reset isValid flag

      // Validate first name
      if (this.firstname === "") {
        this.errors.firstname = "First name is required";
        this.isValid = false;
      } else if (!/^[a-zA-Z]+$/.test(this.firstname)) {
        this.errors.firstname = "Please enter letters only";
        this.isValid = false;
      }

      // Validate last name
      if (this.lastname === "") {
        this.errors.lastname = "Last name is required";
        this.isValid = false;
      } else if (!/^[a-zA-Z]+$/.test(this.lastname)) {
        this.errors.lastname = "Please enter letters only";
        this.isValid = false;
      }

      // Validate username
      if (this.username === "") {
        this.errors.username = "Username is required";
        this.isValid = false;
      } else if (this.username.length < 3) {
        this.errors.username = "Username must be at least 3 characters";
        this.isValid = false;
      }

      // Validate password
      if (this.password === "") {
        this.errors.password = "Password is required";
        this.isValid = false;
      } else if (!/(?=.*[$%^&*])/.test(this.password)) {
        this.errors.password =
          "Password must contain at least 1 special character ($, %, ^, &, *)";
        this.isValid = false;
      } else if (this.password.length < 4) {
        this.errors.password = "Password must be at least 4s characters";
        this.isValid = false;
      }

      // Validate confirm password
      if (this.confirm !== this.password) {
        this.errors.confirm = "Passwords do not match";
        this.isValid = false;
      }

      // Validate email
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
      if (this.email === "") {
        this.errors.email = "Email is required";
        this.isValid = false;
      } else if (!emailRegex.test(this.email)) {
        this.errors.email = "Please enter a valid email address"; 
        this.isValid = false;
      } 
      // Address Condition Optional
      if (this.address.length > 40) {
        this.errors.address =
          "Address must be less than or equal to 40 characters";
        this.isValid = false;
      }

      // Suburb Condition Optional
      if (this.suburb.length > 20) {
        this.errors.suburb =
          "Suburb must be less than or equal to 20 characters";
        this.isValid = false;
      }

      // Validate Postcode
      if (this.postcode === "") {
        this.errors.postcode = "Postcode is required";
        this.isValid = false;
      } else if (!/^\d{4}$/.test(this.postcode)) {
        this.errors.postcode = "Postcode must be exactly 4 numeric digits";
        this.isValid = false;
      }

      // Validate Phone Number
      if (this.phone === "") {
        this.errors.phone = "Phone number is required";
        this.isValid = false;
      } else if (!/^04\d{8}$/.test(this.phone)) {
        this.errors.phone = "Phone number must be 10 digits and begin with 04";
        this.isValid = false;
      }

      // Validate agree to terms
      if (!this.agree) {
        alert("Please agree to the terms and conditions");
        this.isValid = false;
      }

      if (!this.isValid) {
        event.preventDefault(); // Prevent form submission if not valid
      }
    },
    toggleDetails() {
      this.detailAreVisible = !this.detailAreVisible;
    },
  },
});

app.mount("#app");
