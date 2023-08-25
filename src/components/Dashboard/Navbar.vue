<template>
  <div id="app">

    
    <div id="wrapper">
      <div id="sidebar-wrapper">
        <nav class="sidebar">
          <ul class="sidebar__toggled">
            <li>
              <a
                href="javascript:void(0)"
                class="sidebar-toggle"
                @click="toggleSidebar"
              >
                Menu ≡
              </a>
            </li>
          </ul>
        </nav>
        <nav class="sidebar">
          <ul>
            <div
              v-for="(item, index) in sidebaritems"
              :key="index"
              class="sidebar-item"
              :class="{
                'sidebar-item': true,
                active: $route.path === item.path,
              }"
            >
              <router-link
                :to="item.path"
                class="nav-items w3-bar-item"
                tag="a"
              >
                <span class="icon">
                  <i :class="item.icon"></i>
                </span>
                <span class="item-text">{{ item.displayName }}</span>
              </router-link>
              <hr class="sidebar-divider" />
            </div>
          </ul>
        </nav>
      </div>
      <div id="page-content-wrapper"></div>
    </div>
    <!-- Toggle button only for mobile screens -->
    <button class="toggle-button d-md-none" @click="toggleSidebar">≡</button>
    <!-- Sidebar container -->
    <div
      id="sidebar-container"
      :class="{ 'toggled': sidebarVisible }"
    >

<!-- Sidebar container -->
<div
      id="sidebar-container"
      :class="{ 'toggled': sidebarVisible }"
    >
      <!-- Sidebar content -->
      <nav class="sidebar">
        <ul>
          <div
            v-for="(item, index) in sidebaritems"
            :key="index"
            class="sidebar-item"
            :class="{
              'sidebar-item': true,
              active: $route.path === item.path,
            }"
          >
            <a
              :href="item.path"
              class="nav-items w3-bar-item"
            >
              <span class="icon">
                <i :class="item.icon"></i>
              </span>
              <span class="item-text">{{ item.displayName }}</span>
            </a>
            <hr class="sidebar-divider" />
          </div>
        </ul>
      </nav>
    </div>



    <!-- chat popup -->
    <div class="chat-popup">
      <button class="chat-toggle" @click="toggleChat">
        <i class="fas fa-comments"></i>
      </button>
      <div class="chat-container" v-if="showChat">
    <div class="chat-header">Chat with support</div>
   
    <div class="chat-messages">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="['chat-message', message.type === 'outgoing' ? 'sent' : 'received']"
      >
        {{ message.text }}
      </div>
    </div>
    <div class="chat-input">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message...">
      <button @click="sendMessage" class="send-button">
        <i class="fas fa-paper-plane"></i>
      </button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>

import io from 'socket.io-client';

export default {  
  created(){
    this.connectSocket(); 
  },
  data() {
    return {
      created: undefined,
      showChat: false,
      messages: [],
      newMessage: "",
      serverconnected:false,
      sidebarVisible: false,
      socket: null, // Store the socket instance
      sidebaritems: [
        {
          path: "/Users",
          name: "Users",
          displayName: "Users",
          icon: "fa fa-user", // Example FontAwesome icon class
        },
        {
          path: "/Profile",
          name: "Profile",
          displayName: "Profile",
          icon: "far fa-user-circle", // FontAwesome icon class for profile
        },
        {
          path: "/Teachers",
          name: "Teachers",
          displayName: "Teachers",
          icon: "fas fa-chalkboard-teacher", // FontAwesome icon class for teachers
        },
        {
          path: "/Students",
          name: "Students",
          displayName: "Job Applicants",
          icon: "fas fa-building", // FontAwesome icon class for students
        },
       
      ],
    };
  },
  computed: {
shouldShowSidebar() {
  return this.sidebarVisible || !this.isMobile;
},

    isMobile() {
      return window.innerWidth <= 770; // Adjusting the breakpoint as needed
    },
    messages() {
      // Use Vuex state messages array here
      return this.$store.state.messages;
    },
    
  },


  methods: {
    connectSocket() {
      this.socket = io('http://192.168.11.213:3000');

      // Listen for incoming messages
      this.socket.on('receive-message', (data) => {
        const receivedMessage = {
          id: Date.now(),
          text: data.message,
          type: 'received',
        };
        this.addChatMessage(receivedMessage); // Dispatch action to add message to Vuex
      });

      
    },
    toggleChat() {
      this.showChat = !this.showChat;
    },
    async sendMessage() {
      if (this.newMessage.trim() !== '') {
        // Emit the message to the backend using Socket.IO
        this.socket.emit('send-message', { message: this.newMessage });

        // Assuming the message sent is an outgoing message with an ID
        const sentMessage = {
          id: Date.now(),
          text: this.newMessage,
          type: 'outgoing',
        };
        this.sessages.push(sentMessage);
      this.newMessage = ''; // Clear the input field
      }
    },
       toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },

    toggleChat() {
      this.showChat = !this.showChat;
    },

  },
};

</script>


<style scopped>
@import "@fortawesome/fontawesome-free/css/all.min.css";

.chat-messages {
  display: flex;
  flex-direction: column-reverse; /* Display messages in reverse order */
  flex: 1;
  padding: 10px;
  color: whitesmoke;
  
}

.chat-message {
  padding: 5px 10px;
  margin: 5px;
  border-radius: 8px;
  max-width: 70%; /* Limit the width of the message container */
}

.sent {
  align-self: flex-end; /* Align sent messages to the right */
  background-color: #0C134F;
  color: white;
  text-align: right;
}

.received {
  background-color: #1e3a58;
  color: white;
  text-align: left;
}

* New styles for toggling sidebar on mobile */



.toggled-width {
  width: 90px; /* Adjust as needed */
  transition: width 0.3s;
}

#sidebar-container.toggled {
  /* left: -1px; */
  width: 80px; /* Adjust as needed */
}
.chat-header{
  color: #ffffff;
  background-color: #a09d9d;
}
.sidebar-item.active {
  background-color: #5b6675; /* Set the active item background color */

  transition: background-color 1.3s; /* Add a smooth transition effect */
}

/* Style for the text and icon within the acti
ve item */
.sidebar-item.active .icon,
.sidebar-item.active .item-text {
  color: white; /* Set the color for the icon and text */
}

/* Apply padding to the active item to create space around the content */
.sidebar-item.active {
  padding: 10px; /* Adjust as needed */
}

/* Add hover effect for the non-active items */
.sidebar-item:not(.active):hover {
  background-color: #081932; /* Set the hover background color */
  transition: background-color 0.3s; /* Add a smooth transition effect */
}
.chat-popup {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  height: 20px;
}

.chat-toggle {
  background-color: #0d2a49;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  
}

.chat-container {
  position: absolute;
  bottom: 50px;
  right: 0;
  width: 300px;
  background-color: rgb(35, 39, 61);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.chat-messages {
   max-height: 500px; 
  overflow-y: auto; 
  padding: 10px;
  padding: 5px 0;
  color: whitesmoke;
  flex: 1;
}


.chat-input {
  display: flex;
  align-items: center;
  padding: 10px;
}

.chat-input input {
  flex: 1;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.chat-input button {
  background-color: #1e3a58;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
.chat-container {
  display: flex;
  flex-direction: column;
  height: 500px;
  border: 1px solid #ccc;
  padding: 10px;
}


.message {
  padding: 5px 10px;
  margin: 5px;
  border-radius: 8px;
}

.sent {
  align-self: flex-end;
  background-color: #0C134F;
  color: white;
}

.input-container {
  display: flex;
  margin-top: 10px;
}

.input-field {
  flex: 1;
  padding: 8px;
}
.send-button {
  padding: 8px 15px;
  background-color: #0C134F;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
@media (max-width: 768px)
{
  .sidebar {
    display: block;
  }
}
.sidebar-item {
  display: flex;
  margin-left: 0;
  align-items: center;
}
#sidebar-wrapper.toggled {
  left: 0;
  margin-left: 0;
}

.sidebar-toggled #page-content-wrapper {
  margin-left: 60px; /* Adjust as needed */
}
#sidebar-wrapper {
  /* ... Your existing styles ... */
  left: 0; /* Remove the initial left value */
  margin-left: 0; /* Remove the initial margin-left value */
  /* ... Other styles ... */
}
#wrapper.toggled #sidebar-wrapper {
  left: 0; /* Adjust as needed, or you can remove this rule */
  margin-left: 0; /* Adjust as needed, or you can remove this rule */
}
.toggle-button {
  display: block;
  margin: 10px;
  padding: 10px 20px;
  background-color: #0c134f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
/* new css */
#wrapper {
  padding-left: 250px;
  transition: all 0.5s ease;
}
#wrapper.toggled {
  padding-left: 60px; /* Adjust as needed */
}
#sidebar-wrapper {
  z-index: 1000;
  position: fixed;
  left: -250px;
  width: 250px;
  height: 100%;
  overflow-y: auto;
  background: #000;
  padding-top: 15px;
  transition: all 0.5s ease;
}

#wrapper.toggled #sidebar-wrapper {
  left: 0;
  margin-left: 0;
}

#page-content-wrapper {
  width: 100%;
  padding: 15px;
  transition: margin-left 0.5s ease;
}

#wrapper.toggled #page-content-wrapper {
  margin-left: 250px;
} /* Sidebar Styles */

.sidebar {
  margin: 0;
  padding: 0;
}
.sidebar li.title {
  letter-spacing: 0.01em;
  font-size: 2rem;
  line-height: 4.2rem;
}
.sidebar ul {
  padding-left: 0px;
  list-style: none;
}
.sidebar ul li {
  display: block;
}
.sidebar ul li a {
  display: block;
  position: relative;
  text-decoration: none;
  color: #999999;
}
.sidebar ul li a [class*="icon"] {
  margin-right: 15px;
}
.sidebar ul li a#main-toggle:after,
.sidebar ul li a.dropdown-toggle:after {
  right: 20px;
  bottom: 5px;
}
.sidebar .sidebar__main {
  border-bottom: 1px solid #373737;
}
.sidebar .sidebar__toggled {
  font-size: 2rem;
  line-height: 3.4rem;
}
.sidebar ul li.title,
.sidebar .sidebar__main--brand a {
  color: #999999;
}

#main-toggle:after,
.dropdown-toggle:after {
  font-family: "Glyphicons Halflings";
  font-size: 0.7em;
  position: absolute;
  margin-left: 0.25em;
  bottom: 0;
  content: "\e114";
}

.sidebar__toggled {
  border-bottom: 1px solid #444;
}
#main-toggle:after {
  font-size: 1em;
  content: "\e055";
}
@media (min-width: 768px) {
  #wrapper {
    padding-left: 250px;
  }

  #wrapper.toggled {
    padding-left: 50px;
  }

  #sidebar-wrapper {
    left: 250px;
    margin-left: -250px;
  }

  #wrapper.toggled #sidebar-wrapper {
    left: -200px;
    margin-left: 0;
  }

  #page-content-wrapper {
    padding: 20px;
  }

  #wrapper.toggled #page-content-wrapper {
    position: relative;
    margin-right: 50px;
  }
}
/* new end */

.sidebar-container {
  display: flex;
}

.toggle-button {
  margin-right: 10px;
}

#sidebar {
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  width: 21%;
  position: fixed;
  background-color: #081932;

  background-size: cover;
  background-position: center;
}
#sidebar > div {
  margin-left: 5px;
  margin-right: 6px;
  margin-bottom: 18px;
  border-bottom: 1px solid rgb(212, 208, 208);
}
#sidebar > div > a:hover {
  background-color: #14305b;
}
#sidebar > div > a:active {
  background-color: #51698d;
}

#menu-heading {
  font-size: 2rem;
  font-weight: 500;
  color: white;
  border-bottom: 1px solid rgb(226, 220, 220);
  margin-top: 14px;
}

.nav-items {
  text-decoration: none;
  color: white;
  font-weight: 400;
  font-size: 1rem;
  text-align: left;
  margin-bottom: 18px;
}
.w3-button {
  margin-left: -48.5rem;
  position: relative;
  background-color: rgb(18, 55, 85);
  color: #ffffff;
  border: #ffffff;
  size: 2rem;
  border-radius: 20px;
}
.sidebar-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 18px;
  margin-left: 0;
  padding: 10px 15px; /* Adjust padding to create space between items */
  transition: background-color 0.3s;
}

.icon {
  align-items: left;
  float: left;
  margin-right: 15px;
  color: aliceblue;
}

.item-text {
  align-items: center;
  font-size: 1.1rem;
  color: white;
}
.main-content {
  flex: 1;
  transition: margin-left 0.5s;
}

.full-width {
  margin-left: 0;
}
@media (max-width: 768px) {
  .item-text {
    display: none; /* Hide text on mobile */
  }
}
.full-width {
  width: 250px; /* Adjust as needed */
  transition: width 0.3s;
}

/* Styles for toggled sidebar */
.toggled-width {
  width: 60px; /* Adjust as needed */
  transition: width 0.3s;
}

/* Styles for main content */
#page-content-wrapper {
  transition: margin-left 0.3s;
}

/* Styles for main content when toggled */
.sidebar-toggled #page-content-wrapper {
  margin-left: 60px; /* Adjust as needed */
}

.toggle-button {
  display: block;
  margin: 10px;
  padding: 10px 20px;
  background-color: #0c134f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  float: right;
  margin-left: -12px;
}

/* Style for the sidebar container */
#sidebar-container {
  z-index: 1001; /* Make sure the sidebar is above the page content */
  position: fixed;
  top: 0;
  left: -250px; /* Start the sidebar off-screen */
  width: 250px;
  height: 100%;
  overflow-y: auto;
  background: #000;
  padding-top: 15px;
  transition: left 0.5s ease; /* Add a smooth transition effect */
}


/* Style for the main content */
#page-content-wrapper {
  width: 100%;
  padding: 15px;
  transition: margin-left 0.5s ease;
}

/* Style for the main content when the sidebar is toggled */
.toggled #page-content-wrapper {
  margin-left: 250px; /* Adjust as needed */
}

/* Style for the sidebar when it's toggled */
.toggled #sidebar-container {
  left: 0; /* Slide the sidebar in */
}

</style>
    