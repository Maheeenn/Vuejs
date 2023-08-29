import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: '',
    password: '',
    registeredUsers: [],
    loggedInUsers: [],
   
  },
  getters: {
    getRegister(state) {
      return state.registeredUsers;
    },
  },
  mutations: {
    // setEmail(state, email) {
    //   state.email = email;
    // },
    // setPassword(state, password) {
    //   state.password = password;
    // },
    addRegisteredUser(state, user) {
      // console.log("Adding registered user:", user);
      state.registeredUsers.push(user);
    },
    loginUser(state, user) {
      state.loggedInUsers.push(user);
    },
   
  },
  actions:
   {
    async login({ commit }, credentials) {
      try {
        axios.post('http://192.168.11.213:3000/users/login', credentials);
        // Commit any mutations based on the sign-in response if needed
      } catch (error) {
        console.error("Error during sign-in:", error);
        // Handle error, maybe commit a mutation to set an error state
      }
    },

    async register({ commit }, credentials) {
      try {
        const response = await axios.post('http://192.168.11.213:3000/users/createuser', user);
        // Commit any mutations based on the sign-up response if needed
      } catch (error) {
        console.error("Error during sign-up:", error);
        // Handle error, maybe commit a mutation to set an error state
      }
    },

   
  },
  modules: {}
});