<template>
  <div>
    
    <div class="container-fluid p-0 m-0">
      <div class="row g-0">
        <!-- left panel -->
        <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <!-- right form panel -->
        <div class="col-md-8 col-lg-6 signin-bg-image">
          <div class="signin d-flex align-items-center">
            <div class="container">
              <div class="row">
                <div class="col-md-9 col-lg-8 mx-auto">
                  <h3 class="signin-heading mb-5">Login In </h3>
                  <!-- Sign In Form -->
                  <form @submit.prevent="login">
                    <!-- user email -->
                    <div class="mb-3 input-field">
                      <label for="email">Email<span class="text-danger"></span></label>
                      <input type="email" class="form-control" id="email" placeholder="name@gmail.com"
                        v-model.lazy="email" title="Please enter your correct email." required>
                    </div>
                    <!-- user password -->
                    <div class="input-field">
                      <label for="password">Password<span class="text-danger"></span></label>
                      <input type="password" class="form-control" id="password" placeholder="Password"
                        v-model.lazy="password" required>
                    </div>
                    <div class="signup-link mb-3">
                      <router-link tag="a" to="/signup">Don't have an account? Signup!</router-link>
                    </div>
                    <div class="d-grid">
                      <button class="btn btn-signin text-uppercase fw-bold" type="submit" @click="setLoginUser">
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      if (!this.email || !this.password) {
        alert('Please provide both email and password.');
        return;
      }

      try {
     const credentials = {
          email: this.email,
          password: this.password
        };
        await this.login(credentials);
        
        // If login is successful, you can navigate to a new route
        // For example, redirect to the dashboard
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Error during login:', error);
        // Handle error, show error message to the user
        alert('Login failed. Please check your credentials and try again.');
      }
    }
  }
};

</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.signin {
  min-height: 100vh;
}

/* left panel */
/* background image*/
.bg-image {
  background-image: url("../assets/left.jpg");
  background-size: cover;
  background-position: center;
}

/* right panel */
/* form input fields focus */
.form-control:focus {
  border-color: #757371ab;
  
}
.form-control:hover {
  border-color:#757371ab;
  
}
.input-field {
  text-align: left;
}

.input-field>label {
  color: #0C134F;
  font-weight: bold;
  font-size: 14px;
}

.input-field>input::placeholder {
  font-size: 12px;
}

/* sign in heading at the top */
.signin-heading {
  font-size: 2rem;
  font-weight: 700;
  color: #0C134F;
}

/* signup link */
.signup-link {
  text-align: right;
}

.signup-link>a {
  font-size: 0.6875rem;
  text-decoration: none;
  color: #0C134F;
}

.signup-link>a:hover {
  text-decoration: underline;
}

/* sign in button */
.btn-signin {
  color: white;
 background-color: #0C134F;
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 3.125rem;
}

.btn-signin:hover {
  color:white;
  box-shadow: 0 0 0.1875rem 0.0625rem #b1b0b0b7;
  background-color: #474e83;
}

/* media queries */
@media screen and (max-width: 770px) {
  .signin-bg-image {
 
    background-size: cover;
    background-position: center;
    width: 100%;
  }

  .signin-heading {
    font-size: 2.3rem;
    color: rgb(0, 0, 0);
  }

  .form-control {
    background-color: transparent;
    border: 1px solid rgb(43, 42, 42);;
    
  }

  .form-control:focus {
    background-color: transparent;
    box-shadow: none;
  }

  label,
  input {
    color: white !important;
  }
}
</style>
