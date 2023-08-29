<template>
  <div class="left-panel bg-image">
    <div class="container mt-0">
      <h2>Job Application Form</h2>
      <form @submit.prevent="submitForm">
        <section>
          <h3>Personal Information</h3>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="text" class="form-control" id="firstName" v-model="firstName" required />
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control" id="email" v-model="email" required />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input type="text" class="form-control" id="lastName" v-model="lastName" required />
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" id="password" v-model="password" required />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="cinc">CNIC:</label>
                <input type="number" class="form-control" id="cinc" v-model="cinc" required pattern="[0-9]{14}" />
              </div>
              <div class="form-group">
                <label for="phoneNo">Mobile Number:</label>
                <input type="number" class="form-control" id="phoneNo" v-model="phoneNo" required pattern="[0-9]{1,13}" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="dob">Date of Birth:</label>
                <input type="date" class="form-control" id="dob" v-model="dob" required />
              </div>
              <div class="form-group">
                <label for="age">Age:</label>
                <input type="number" class="form-control" id="age" v-model="age" required min="0" max="120" />
              </div>
            </div>
          </div>
        </section>

        <!-- Educational Background Section -->
        <section>
        
          <div class="form-group">
            <label for="degreeProgram">Degree Program:</label>
            <select class="form-control" id="degreeProgram" v-model="degreeProgram" required>
              <option value="BSSE">BSSE</option>
              <option value="BSCS">BSCS</option>
              <option value="BSIT">BSIT</option>
              <option value="BSAI">BSAI</option>
              <option value="BSCYBER">BSCYBER</option>
              <option value="BSDS">BSDS</option>
            </select>
  </div>
            <div class="form-group">
              <label for="universityName">University Name:</label>
              <input type="text" class="form-control" id="universityName" v-model="universityName" required />
            </div>
          <div class="form-group">
            <label for="education">Education:</label>
            <select class="form-control" id="education" v-model="education" required>
              <option value="highSchool">High School</option>
              <option value="bachelors">Bachelors</option>
              <option value="masters">Masters</option>
            </select>
          </div>
          <div class="form-group">
            <label for="cv">Upload CV (JPEG, PDF, JPG, PNG, max 2MB):</label>
            <input
              type="file"
              class="form-control-file"
              id="cv"
              accept=".jpg, .jpeg, .png, .pdf"
              @change="handleFileChange"
              required
              :disabled="cvSelected"
            />
            <small class="form-text text-muted">Max file size: 2MB</small>
            <div v-if="cvSizeError" class="alert alert-danger mt-2">
              CV file size should not exceed 2MB.
            </div>
            <div v-if="cvFormatError" class="alert alert-danger mt-2">
              Invalid file format. Supported formats: JPEG, PNG, PDF.
            </div>
          </div>
        </section>

        <!-- Cover Letter Section -->
        <section>
         
          <div class="form-group">
            <label for="coverLetter">Cover Letter (max 400 words):</label>
            <textarea class="form-control" id="coverLetter" v-model="coverLetter" maxlength="400" required></textarea>
          </div>
        </section>

        <!-- Submit Button -->
        <button class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cinc: "",
      phoneNo: "",
      dob: "",
      age: "",
      education: "",
      cv: "",
      cvSelected: false,
      cvSizeError: false,
      cvFormatError: false,
      coverLetter: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        // Validate CV size and format
        if (
          this.cv &&
          !["image/jpeg", "image/png", "application/pdf", "image/jpg"].includes(this.cv.type)
        ) {
          this.cvFormatError = true;
          return;
        }

        // Add other form data fields
        const formData = new FormData();
        formData.append("firstName", this.firstName);
        formData.append("lastName", this.lastName);
        formData.append("cinc", this.cinc);
        formData.append("password", this.password);
        formData.append("phoneNo", this.phoneNo);
        formData.append("email", this.email);
        formData.append("dob", this.dob);
        formData.append("age", this.age);
        formData.append("education", this.education);
        formData.append("cv", this.cv); // Append the selected file

        // Send the form data to the server
        await axios.post("http://192.168.11.213:3000/registration/register-user", formData);

        // After a successful submission, reset form fields
        this.resetForm();

        // After a successful submission, redirect to the students page
        this.$router.push({
          name: "Students",
          query: {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            education: this.education,
            phoneNo: this.phoneNo,
            cinc: this.cinc,
            age: this.age,
            address: this.address,
            dob: this.dob,
            cv: this.cv ? this.cv.name : " ", // Pass file name
          },
        });

        // Handle success or show a message to the user
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle error or show an error message to the user
      }
    },
    handleFileChange(event) {
      this.cv = event.target.files[0];
      this.cvSizeError = false;
      this.cvFormatError = false;
      this.cvSelected = true; // Set to true when a file is selected
    },
    resetForm() {
      // Reset form fields here
      this.firstName = "";
      this.lastName = "";
      this.cnic = "";
      this.cv = "";
      this.cvSelected = false;
      this.cvSizeError = false;
      this.cvFormatError = false;
    },
  },
};
</script>


<style scoped>
* {
  padding: 0;
  margin: 0;
}
.bg-image {
  background-image: url("../assets/left.jpg");
  background-size: cover;
  background-position: center;
}
.container {
  margin-top: 50px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 2px;
  width: 50%; /* Adjust the width as needed */
  margin-left: auto; /* Align to the right */
  margin-right: 0; /* Remove default margin */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
}

h2 {
  font-size: 24px;
  color: #09090c;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
}
.form-group > label {
  color: #111111;
  font-size: 14px;
  font-weight: bold;
  justify-content: left;
  text-align: left; /* Align labels to the left */
}
.form-group {
  margin-bottom: 20px;
}

.form-control {
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 10px;
  background-color: #ffffff;
}

.form-control-file {
  padding: 10px;
  background-color: #ffffff;
}

.form-check-label {
  color: #0c134f;
}

.btn-primary {
  background-color: #0c134f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
}

.btn-primary:hover {
  background-color: #0c134f;
  opacity: 0.9;
}

.text-muted {
  color: #ffffff;
}

/* Media queries */
@media screen and (max-width: 768px) {
  .left-panel {
    background-size: cover;
    background-position: top;
  }
  .container {
    width: 100%;
    margin: 0;
    padding: 20px 10px;
    border-radius: 0; /* Remove border radius for mobile */
    box-shadow: none; /* Remove shadow for mobile */
  }
  h2 {
    font-size: 20px;
    margin-bottom: 10px;
    text-align: center;
  }
  .form-group {
    margin-bottom: 15px;
  }
  .btn-primary {
    padding: 8px 15px;
    font-size: 14px;
  }
  /* Adjust other styles as needed for mobile */
}
</style>
