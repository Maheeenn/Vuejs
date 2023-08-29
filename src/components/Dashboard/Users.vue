<template>
   <div>
       
    <div v-if="isLoading" class="loader">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else>
        <table class="table table-striped table-sm">
          <thead class="table-header table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.email }}</td>
              <td class="more-user-details">
                <button type="button" class="btn btn-danger" @click="showUserDetails(item)">
                  Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
 <!-- User Details Modal -->
 <!-- <div class="modal fade" id="userDetailsModal" tabindex="-1" role="dialog" aria-labelledby="userDetailsModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="userDetailsModalLabel">{{ selectedUser.name }} Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p><strong>ID:</strong> {{ selectedUser.id }}</p>
            <p><strong>Name:</strong> {{ selectedUser.name }}</p>
            <p><strong>Suite:</strong> {{ selectedUser.address.suite }}</p>
            <p><strong>Zip Code:</strong> {{ selectedUser.address.zipcode }}</p>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        items: [],
        isLoading: true, // Initially set to true to show loader
      };
    },
    mounted() {
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.error("Something went wrong :(", error);
        })
        .finally(() => {
          this.isLoading = false; // Set to false when loading is done
        });
    },
 
};
  </script>
            
  
  <style scopped>
  .users-heading {
    color: #081932;
  }
    
  .table {
    width: 80% !important;
    border: 1px solid #d7d9db !important;
    float: right;
  }
  
  td {
    vertical-align: middle;
  }
  .table-responsive {
  overflow-x: auto; /* Allow horizontal scrolling for small screens */
}

.table-container {
  min-width: 100%; /* Ensure the container takes full width */
}
/* Center align the table cells on small screens */
@media (max-width: 767px) {
  td {
    text-align: center;
    font-size: smaller;
  }
}

/* Adjust modal content for smaller screens */
@media (max-width: 767px) {
  .modal-dialog {
    max-width: 90%; /* Adjust the maximum width of the modal */
  }
}
@media (max-width: 767px) {
  .table {
    width: 100% !important;
  }
  
  td {
    font-size: smaller;
  }
}
/* Override Bootstrap's default modal styles */
.modal-content {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  justify-content: center;
}
.loader {
  text-align: center;
  margin-top: 20px;
  font-size: larger;
  
}

  </style>
  
  