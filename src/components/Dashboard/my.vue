
<template>
  <div class="students-page">
    <h2>Applicants Data</h2>
    

  <!-- Navigation bar -->
  <div class="navbar"> 
      <!-- Search bar -->
      <div class="search-container">
      <input v-model="search" placeholder="Search by email or name" />
      <i class="search-icon"></i>
    </div>

      <!-- Sorting dropdown-->
       <div class="sort-container">
        <span class="sort-text">Sort By:</span> 
        <select v-model="sortBy" class="sort-dropdown">
           <option value="asc">Ascending</option>
          <option value="desc">Descending</option> 
        </select> 
      </div>
    </div> 

 

    <!-- table of applicants -->
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>education</th>
          
          <th>CNIC</th>
          <th>Address</th>
          <th>Age</th>
          <th>Gender</th>
          <th>DOB</th>
          <th>CV</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in applicantUsers" :key="user.id">
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.Education }}</td> 
            <td>{{ user.CINC }}</td>
            <td>{{ user.address }}</td>
            <td>{{ user.Age }}</td>
            <td>{{ user.Gender }}</td>
            <td>{{ user.DOB }}</td>
            <td>
              <a :href="user.cv" download>
                <i class="download-icon fas fa-download"></i>
              </a>
            </td>
            <td>
        <button
          @click="showModalForApprove(user)"
          class="action-button approve-button"
        >
          Approve
        </button>
        <button
          @click="showModalForDisapprove(user)"
          class="action-button disapprove-button"
        >
          Reject
        </button>
      </td>
        
          </tr>
         </tbody>
    </table>

    <!-- <div class="modal" v-if="showModal">
    <div class="modal-content">
      <p>Are you sure you want to perform this action to {{ actionText }} this user?</p>
      <div class="modal-buttons">
        <button @click="handleChoice(true)">Yes</button>
        <button @click="handleChoice(false)">No</button>
      </div>
    </div>
  </div> -->
    




    <div class="pagination">
      <span class="page-numbers">
        <button
          :class="{ active: currentPage === page }"
          @click="changePage(page)"
          v-for="page in totalPages"
          :key="page"
        >
          {{ page }}
        </button>
      </span>
    </div>

  </div>
  


</template>

<script>

import axios from "axios";

export default {
  // props: {
  //   showModal: Boolean,
  //   approvedText: String,
  //   user: Object,
  // },
 
  data() {
    return {
      applicantUsers: [],
      sortBy: "asc",
      currentPage: 1,
      totalPages: 5,
      search: "",
      // showModal: false,
      // modalActionText: "",
      // currentUser: null,
      
    };  
  },
  methods: {

    disapproveUser(email) {
      axios
        .put('http://192.168.11.213:3000/users/updateRegisterUsers', {
          email,
          approved : 0,
        })
        .then(response => {
          console.log('User disapproved:', response.data);
          const user = this.registeredUsers.find(user => user.email === email);
          if (user) {
            user.approved = 0;
          }
          // You might want to update the user's 'approved' status in the local data
        })
        .catch(error => {
          console.error('Error disapproving user:', error);
        });
    },


    approveUser(email) {
      axios
        .put('http://192.168.11.213:3000/users/updateRegisterUsers', {
          email,
          approved : 0,
        })
        .then(response => {
          console.log('User disapproved:', response.data);
          const user = this.registeredUsers.find(user => user.email === email);
          if (user) {
            user.approved = 0;
          }
          // You might want to update the user's 'approved' status in the local data
        })
        .catch(error => {
          console.error('Error disapproving user:', error);
        });
    },
//  updateRegisterUsers(user, approved) {
//    const data = {
//      email: user.email,
//    approve: approve,
//     };
    
//     axios.put('http://192.168.11.213:3000/users/updateRegisterUsers', data)
//     .then(response => {
//       if (response.data.success) {
//         // Update the status locally if the backend confirms the update
//         user.Status = approved === 1 ? "Approved" : "Disapproved";
//       }
//     })
//     .catch(error => {
//         console.error("Error updating user status:", error);
//       });
//     },
    
//   approveApplicant(user) {
//     this.updateRegisterUsers(user, 1);
//   },
  
//   disapproveApplicant(user) {
//     this.updateRegisterUsers(user, 0);
//   },
  
  SearchedUsers() {
    if (this.search.trim() === "") {
      return this.applicantUsers;
    } else {
      const lowerSearch = this.search.toLowerCase();
      return this.applicantUsers.filter(
        (user) =>
        user.email.toLowerCase().includes(lowerSearch) ||
        user.firstName.toLowerCase().includes(lowerSearch) ||
        user.lastName.toLowerCase().includes(lowerSearch)
        );
      }
      
    },
    usersToDisplay() {
      return this.search.trim() === "" ? this.applicantUsers : this.filteredUsers;
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
      this.fetchApplicantUsers();
    },
    fetchApplicantUsers() {
      // Update the URL to include the 'page' parameter
      const apiUrl = `http://192.168.11.213:3000/users/getAllRegisterUser?page=${this.currentPage}`;
      
      axios.get(apiUrl)
      .then(response => {
        this.applicantUsers = response.data.getall;
        console.log("this.applicantUsers", this.applicantUsers);
      })
      .catch(error => {
        console.error("Error fetching applicant users:", error);
      });
      
    },
    
    
    // showModalForApprove(user) {
    //   this.currentUser = user;
    //   this.modalActionText = "approve";
    //   this.showModal = true;
    // },
    // showModalForDisapprove(user) {
    //   this.currentUser = user;
    //   this.modalActionText = "disapprove";
    //   this.showModal = true;
    // },
    // handleModalChoice(choice) {
    //   if (choice) {
    //     if (this.modalActionText === "approve") {
    //       this.approveApplicant(this.currentUser);
    //     } else if (this.modalActionText === "disapprove") {
    //       this.disapproveApplicant(this.currentUser);
    //     }
    //   }
    //   this.showModal = false;
    //   this.currentUser = null;
    // },
        
    async downloadCV(userId) {
  try {
    const response = await axios.get(`URL_TO_DOWNLOAD_ENDPOINT`, {
      responseType: 'blob', // Set the response type to 'blob' to handle binary data
    });

    // Create a blob from the response data
    const blob = new Blob([response.data], { type: 'application/pdf' }); // Assuming CV is in PDF format

    // Create a download link
    const downloadLink = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.setAttribute('download', `CV_${userId}.pdf`);
    document.body.appendChild(downloadLink);

    // Click the link to trigger the download
    downloadLink.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);
  } catch (error) {
    console.error('Error downloading CV:', error);
  }
},
  
  
  },
  mounted() {
    // Fetch data for the initial page (page 1)
    this.fetchApplicantUsers();
  },
};
</script>


<style scoped>


.download-icon {
  color: #f7f9fc; /* Download icon color */
  font-size: 18px;
  cursor: pointer;
}

.download-icon:hover {
  color: #357ebd; /* Darker shade of blue on hover */
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  text-align: center;
}

.modal-buttons {
  margin-top: 20px;
}

.modal-buttons button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-buttons button:first-child {
  background-color: #70e670; /* Approve button color */
  color: white;
}

.modal-buttons button:last-child {
  background-color: #ec5050; /* Reject button color */
  color: white;
}
.pagination {
  position: relative;
  margin-top: 26rem;
  margin-left:40rem;
  right: 0;
  text-align: center;
}
  .pagination-container {
  padding: 10px;
  background-color: #191635;
  border-radius: 5px;
}

.pagination-container h6 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #242222;
}

/* Style for the pagination component */
.b-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Style for the pagination buttons */
.b-pagination button {
  margin: 0 3px;
  background-color: #254968;
  color: rgb(29, 41, 71);
  border: none;
  border-radius: 3px;
  padding: 4px 8px;
  cursor: pointer;
}

/* Style for the active pagination button */
.b-pagination button.active {
  background-color: #214a6e;
}

/* Style for the disabled pagination button */
.b-pagination button.disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.download-button {
  background-color: #214a6e; /* Blue color */
  color: white;

}

.download-button:hover {
  background-color: #357ebd; /* Darker shade of blue on hover */
}

/* Style for the sort text */
.sort-text {
  font-weight: bold;
  color:#f2f2f2
}
.search-container {
  display: flex;
  justify-content: flex-end; /* Right align the content */
  padding: 5px 10px; /* Adjust padding as needed */
  border-radius: 4px; /* Rounded border corners */
  margin-left: 50rem; /* Add some spacing between search and sort containers */
}
.search-container input {
  flex: 1; /* Allow the input to take up remaining space */
  border: none;
  outline: none;
  padding: 5px;
  font-size: 12px; /* Adjust font size as needed */
}
.sort-container {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Right align the content */
  padding: 5px 10px; /* Adjust padding as needed */
  border-radius: 4px; /* Rounded border corners */
} 
/* Style for the sort dropdown */
.sort-dropdown {
  width: 80px; 
  border: none;
  outline: none;
  padding: 5px;
  font-size: 14px; 
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  background-color: #1c3a55;
}


table {
  width: 80%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #f9f9f9;
  float:right;
  margin-right :1rem;
}

th, td {
  padding: 2px;
  text-align: left;
  font: 6px !important;
  background-color: #3e4347;
  color:white;
  border-right: 0.5px solid white;
  border-bottom: 0.5px solid white;
}

thead th {
  background-color: #333;
  color: white;
  border-left: 2px solid white;
  font: smaller !important;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

tbody tr:hover {
  background-color: #ffffff;
}

.approve-button {
  background-color: #70e670;
  color: white;
}

.disapprove-button {
  background-color: #ec5050;
  color: white;
}

.approve-button:hover {
  opacity: 0.8;
}
.action-button {
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 10px;
  cursor: pointer;
  border: none;
  outline: none;
  transition: background-color 0.3s ease;
  margin-right: 2px;
  width: 50px;
}
.container-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end; /* Align elements to the bottom */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack vertically on small screens */
    align-items: flex-start; /* Align elements to the left on small screens */
  }
}

.sort-container {
  display: flex;
  align-items: center;
  width: 20%; /* Adjust width as needed */

  @media (max-width: 768px) {
    width: 100%; /* Full width on small screens */
    margin-bottom: 10px;
  }
}

.sort-text {
  margin-right: 10px;
  font-weight: bold;
}

.sort-dropdown {
  width: 150px; /* Adjust as needed */
}
/* 
.search-container {
  display: flex;
  align-items: center;
  width: 20%; Adjust width as needed */


  /* @media (max-width: 768px) {
    width: 100%; /* Full width on small screens */
  
</style>