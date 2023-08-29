                <template>
                  <div>
                    <div class="container-fluid p-0 m-0">
                      <div class="row g-0">
                        <div class="left  col-md-4 col-lg-6 img">
                        </div>
                        <div class="col-md-8 col-lg-6 signup-img">
                          <div class="signup d-flex align-items-center">
                            <div class="container">
                              <div class="row">
                               
                                <div class="col-md-9 col-lg-8 mx-auto">
                                  <h3 class="signup-heading mb-5">Create an account!</h3>
                                  <form>
                                    <div class="row mb-3">
                                      <div class="col-lg-6 input">
                                        <label for="first-name">Name</label>
                                        <input type="text" class="form-control" id="name" placeholder=" first name"
                                          v-model.lazy="firstName" title="Please enter only your first name." required />
                                      </div>
                                     
                                    </div>
                                    <div class="mb-3 input">
                                      <label for="email">Email</label>
                                      <input type="email" class="form-control" id="email" placeholder="abc@gmail.com"
                                        v-model.lazy="email" title="Please enter your correct email." required>
                                    </div>
            
                                    <div class="mb-3 input">
                                      <label for="password">Password</label>
                                      <input type="password" class="form-control" id="password" placeholder="Password"
                                        v-model.lazy="password" required>
                                    </div>
                                    <div class="input">
                                      <label for="confirm-password">Confirm Password</label>
                                      <input type="password" class="form-control" id="confirm-password"
                                        placeholder="Confirm your password" v-model.lazy="confirmPassword" required>
                                    </div>
                                    <div class="signin-link mb-3">
                                      <router-link tag="a" to="/Login">Already have an account? Signin!</router-link>
                                    </div>
                                    <div class="d-grid">
                                      <button class="btn Signup_button text-uppercase fw-bold" type="submit" @click="register">
                                        Sign up</button>
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
                    data() {
                      return {
                      firstName: '',
                      lastName: '',
                      email: '', // Make sure this property is defined
                      password: '', // Make sure this property is defined
                      confirmPassword: ''
                      };
                    },
                    methods: {
                      ...mapActions(['register']),
                      async register() {
                        const user = {
                          firstName: this.firstName,
                          lastName: this.lastName,
                          email: this.email,
                          password: this.password,
                        };
                  
                        // Handle validation
                        if (!this.validFirstName || !this.validLastName || !this.validEmail || !this.isPasswordConfirmed) {
                          alert('Invalid field(s).');
                          return;
                        }
                  
                        if (this.isPasswordShort) {
                          alert('Password too short. Please enter again.');
                          return;
                        }
                  
                            try {
                            await this.register(user);
                            this.$router.push('/login'); // Redirect to login page
                          } catch (error) {
                            console.error('Error during registration:', error);
                            alert('Registration failed. Please try again.');
                          }
                        },
                      },
                    computed: {
                      isPasswordShort() {
                        return this.password.length < 8;
                      },
                      isPasswordConfirmed() {
                        return this.password === this.confirmPassword;
                      },
                      validFirstName() {
                        // Add your validation logic for first name
                        return this.firstName.length > 0;
                      },
                      validLastName() {
                        // Add your validation logic for last name
                        return this.lastName.length > 0;
                      },
                      validEmail() {
                        // Add your validation logic for email
                        // For example, you can use a regular expression
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        return emailRegex.test(this.email);
                      },
                    },
                  };

                  </script>
                
                 
                <style scoped>
                * {
                  padding: 0;
                  margin: 0;
                }

                .signup {
                  min-height: 100vh;
                }

                /* left panel */
                .d-md-flex {
                  padding: 10% 5% 0 5%;
                  display: flex !important;
                  flex-direction: column;
                }

                .left{
                  text-align: start;
                  color: white;

                }

                /* background image*/
                .img {
                  background-image: url("../assets/left.jpg");
                  background-size: cover;
                  background-position: center;
                }
                .form-control:focus {
                  border-color: #777675ab;
                  box-shadow: 0 0 0.3125rem 0.1rem #777675ab;
                }
                .form-control:hover {
                  border-color: #777675ab;
                  box-shadow: 0 0 0.3125rem 0.0125rem #777675ab ;
                }

                .input {
                  text-align: left;
                  width: 100%
                }
                .input>label {
                  color: #0C134F;
                  font-weight: bold;
                  font-size: 14px;
                  
                }

                .input>input::placeholder {
                  font-size: 12px;
                }
                /* sign in heading at the top */
                .signup-heading {
                  font-size: 2rem;
                  font-weight: 700;
                  color: #0C134F;
                }
                /* signup link */
                .signin-link {
                  text-align: right;
                }
                .signin-link>a {
                  font-size: 0.6875rem;
                  text-decoration: none;
                  color: #0C134F;
                }
                .signin-link>a:hover {
                  text-decoration: none;
                }

               
                .Signup_button {
                  color: white;
                background-color: #0C134F;
                  font-size: 16px;

                  padding: 0.75rem 1rem;
                  border: none;
                  border-radius: 3rem;
                }

                .Signup_button:hover {
                 color: white;
                  box-shadow: 2px solid #b1b0b0b7;
                  background-color: #1a258b;
                }

                /* media queries */
                @media screen and (max-width: 770px) {
                
                  .signup-heading {
                    font-size: 2.3rem;
                    color: rgb(31, 30, 30);
                  }
                  .form-control {
                    background-color: transparent;
                    border-radius: 1px solid black;
                  
                  }
                  .form-control:focus {
                    background-color: transparent;
                    box-shadow: none;
                  }
                  label,
                  input {
                    color: rgb(15, 15, 15) !important;
                  }
                  .inputs label[data-v-56bbef28] {
                    background-color: transparent;
                    color: #0C134F;
                  }
                  .left{
                    display: none !important;
                  }
                }
                </style>
                  