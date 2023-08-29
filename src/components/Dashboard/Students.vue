
  <template>
    <div class="students-page">
      <h2>Applicants Data</h2>
      

    <!-- Navigation bar -->
    <div class="navbar">
        <div class="search-container">
          <input v-model="search" placeholder="Search by email or name" />
          <i class="search-icon"></i>
        </div>
        <div class="filter-container">
          <i class="filter-icon fas fa-filter"></i>
          <select v-model="filterBy" class="filter-dropdown">
            <option value="all">All</option>
            <option value="approved">Approved</option>
            <option value="disapproved">Disapproved</option>
          </select>
        </div>
        <div class="sort-container">
          <span class="sort-text">Sort By:</span>
         <select v-model="sortBy" class="sort-dropdown" @change="sortByFirstName">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        </div>
      </div> 

      <!-- table of applicants -->
      <table class="table-responsive">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Education</th>
            <th>CNIC</th>          
            <th>Gender</th>
            <th>DOB</th>
            <th>CV</th>
            <th>Status</th>
            <!-- <th>Latest Status</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in usersToDisplay" :key="user.id">
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.Education }}</td> 
              <td>{{ user.CINC }}</td>  
              <td>{{ user.Gender }}</td>
              <td>{{ user.DOB }}</td>
              
              <td>
                <a @click="downloadCV(user.id)">
                  <i class="download-icon fas fa-download"></i>
                </a>
              </td>
        
                <td>
                  <label class="switch">
                <input type="checkbox" v-model="user.approved" @click="performToggleAction(user)">
                <span class="slider round"></span>
                </label>
                </td>

            <!-- <td>{{ user.latestStatus }}</td> -->
            </tr>
          </tbody>
      </table>
      
      
      <!-- Pagination -->
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
    data() {
      return {
        applicantUsers: [],
        sortBy: "asc",
        currentPage: 1,
        totalPages: 5,
        search: "",
        filterBy: "all",
        downloadingCV: false,
        latestStatus:"",
        confirmUser:null,
        
      
      };
    },


  methods: {

 // Function to sort table data by alphabetical order
 sortByFirstName() {
    if (this.sortBy === "asc") {
      this.usersToDisplay.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (this.sortBy === "desc") {
      this.usersToDisplay.sort((a, b) => b.firstName.localeCompare(a.firstName));
    }
  },


    toggleConfirmation(user) {
      this.confirmUser = user;
    },

    cancelConfirmation() {
      this.confirmUser = null;
    },
    updateLatestStatus(user) {
      if (user.approved === 1) {
        user.latestStatus = "Approved";
      } else if (user.approved === 0) {
        user.latestStatus = "Disapproved";
      } else {
        user.latestStatus = "Pending";
      }
    },

    performToggleAction(user) {
  const isApproved = user.approved ? 1 : 0;

  this.updateUserApproval(user.id, isApproved)
    .then(response => {
      if (response.data.success) {
        user.latestStatus = user.approved ? "Approved" : "Disapproved"; // Update latestStatus
      } else {
        console.error("Failed to update user approval status");
      }
    })
    .catch(error => {
      console.error("Error updating user approval status:", error);
    });
},

    // Implementing the updateLatestStatus function    
    updateUserApproval(userId, isApproved) {
  return new Promise((resolve, reject) => {
    axios
      .put("http://192.168.11.213:3000/registration/update-users", {
        id: userId,
        approved: isApproved
      })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
},


    // search filter
    SearchedUsers() {
      if (this.search.trim() === "") {
        return this.applicantUsers;
      } else {
        const lowerSearch = this.search.toLowerCase();
        return this.applicantUsers.filter(
          (user) =>
            user.email.toLowerCase().includes(lowerSearch) ||
            user.firstName.toLowerCase().includes(lowerSearch)
        );
      }
    },
    
    // usersToDisplay() {
    //   return this.search.trim() === "" ? this.applicantUsers : this.SearchedUsers();
    // },
    
    changePage(pageNumber) {
      this.currentPage = pageNumber;
      this.fetchApplicantUsers();
    },
    
    fetchApplicantUsers() {
  const apiUrl = `http://192.168.11.213:3000/registration/get-all-user?page=${this.currentPage}`;

  axios.get(apiUrl)
    .then(response => {
      this.applicantUsers = response.data.getall.map(user => {
        return {
          ...user,
          latestStatus: user.approved === 1 ? "Approved" : user.approved === 0 ? "Disapproved" : "Pending"
        };
      });

      // Update latestStatus for all fetched users
      this.applicantUsers.forEach(user => {
        this.updateLatestStatus(user);
      });
    })
    .catch(error => {
      console.error("Error fetching applicant users:", error);
    });
},


    // download CV 
    downloadCV(userId) {
      const requestData = { id: userId };
      axios
        .get(`http://192.168.11.213:3000/registration/download-cv?id=${userId}`, {
          responseType: 'blob' // Request response as a binary blob
        })
        .then(response => {
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);

          // Create an anchor element to trigger the download
          const link = document.createElement('a');
          link.href = url;
          link.target = '_blank'; // Open the download in a new tab
          link.download = `CV_${userId}.pdf`; // Set the filename for download
          link.click();

          URL.revokeObjectURL(url);
        })
        .catch(error => {
          console.error('Error fetching user CV:', error);
        });
    }
  },
    
    computed: {
    // Modify the usersToDisplay computed property to apply sorting
      usersToDisplay() {
        const filteredUsers = this.SearchedUsers();

        if (this.filterBy === "all") {
          return filteredUsers;
        } else {
          return filteredUsers
            .filter(user => user.status === this.filterBy)
            .sort((a, b) => {
              if (this.sortBy === "asc") {
                return a.firstName.localeCompare(b.firstName);
              } else if (this.sortBy === "desc") {
                return b.firstName.localeCompare(a.firstName);
              }
            });
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
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 30px;
  }

  .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 19px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #071e31;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #071e31;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
  .loader-icon {
    font-size: 16px;
    color: #071e31; /* Blue color */
  }
  .table-responsive {
    overflow-x: auto;
  }
  .filter-container {
    display: flex;
    align-items: center;
    justify-content: flex-start; /* Adjust this alignment */
    padding: 5px 10px;
    border-radius: 4px;
    margin-right: 10px;
  }
  .filter-text {
    margin-right: 10px;
    font-weight: bold;
    color: #f2f2f2;
  }

  .filter-dropdown {
    width: 120px;
    border: none;
    outline: none;
    padding: 5px;
    font-size: 14px;
  }
  .pagination {
    position: fixed;
    bottom: 25px; /* Adjust as needed */
    left: 65%;
    transform: translateX(-50%);
    text-align: center;
    text-align: center;
    margin-bottom: -2rem;
    /* margin-bottom: 1rem;  */
  }

  .pagination-container {
    padding: 5px; /* Adjust padding as needed */
    background-color: #191635;
    border-radius: 5px;
  }


  /* Style for the pagination component */
  .b-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .b-pagination button.active {
    background-color: #214a6e; /* Set a different color for the active button */
    color: white;
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
    align-items: center;
    justify-content: flex-end; /* Adjust this alignment */
    padding: 5px 10px;
    border-radius: 4px;
    margin-right: -10rem;
  }
  .search-container input {
    flex: 1; /* Allow the input to take up remaining space */
    border: none;
    outline: none;
    padding: 5px;
    font-size: 12px; 
    margin-left: 25rem;/* Adjust font size as needed */
  }
  .sort-container {
    display: flex;
    align-items: center;
    justify-content: flex-start; /* Adjust this alignment */
    padding: 5px 10px;
    border-radius: 4px;
    
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
    margin-bottom: 5px;
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
    padding: 6px;
    text-align: center;
    font: 6px !important;
    background-color: #fdfeff;
    color:rgb(8, 8, 8);
    border-right: 0.5px solid rgb(73, 70, 70);
    border-left: 0.5px solid rgb(73, 70, 70);
    border-bottom: 0.5px solid rgb(97, 92, 92);
  }

  thead th {
    background-color: #1e263f;
    color: white;
    border-left: 2px solid white;
    font: smaller !important;
  }

  tbody tr:nth-child(even) {
    background-color: #f2f2f2;
    padding: 10px;
  }

  tbody tr:hover {
    background-color: #ffffff;
  }

  .approve-button {
    background-color: #70e670;
    color: white;
    border: none;
    border-radius: 4px
  }

  .disapprove-button {
    background-color: #ec5050;
    color: white;
    border: none;
    border-radius: 4px
  }

  .action-button:hover {
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

  }
  @media (max-width: 768px) {
    .navbar {
      flex-direction: column;
      align-items: flex-start;
      width: 98%;
      height:20%
    }
    .pagination{
      display:none !important;}
    

    .filter-container,
    .search-container,
    .sort-container {
      width: 100%;
      margin: 10px 0;
      justify-content: flex-end; 
    }

    /* .filter-container,
    .sort-container {
      justify-content: flex-start;
    } */

    .pagination {
      position: absolute;
      text-align: center;
      margin-top: 1rem;
    }

    .pagination span.page-numbers {
      display: block;
      margin-top: 0.5rem;
    }
    }

    @media (max-width: 768px) {
    table {
      width: 100%; /* Make the table take up full width on smaller screens */
      margin-right: 0; /* Remove right margin */
    }

    th,
    td {
      /* Adjust font size and padding for better mobile display */
      font-size: 4px !important;
      padding: 4px;
    margin: 0;
    }}

    @media (min-width: 769px) {
    .filter-container,
    .search-container,
    .sort-container {
      justify-content: flex-end; /* Keep the same alignment on larger screens */
      margin-right: 20px; /* Increase the margin for better separation */
    }
  }

  
/* Tablet Styles */
@media (min-width: 769px) and (max-width: 1024px) {
  /* Adjust container alignment and widths for tablets */
  .navbar {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  
  .filter-container,
  .search-container,
  .sort-container {
    margin-right: 10px;
  }
  
  /* Make the table take up full width on tablet screens */
  table {
    width: 100%;
  }

  /* Adjust font sizes, padding, and margins within table cells */
  th,
  td {
    font-size: 12px !important;
    padding: 8px;
    margin: 0;
  }
  
  /* Show pagination controls for tablets */
  .pagination {
    display: block;
    position: static;
    text-align: center;
    margin-top: 1rem;
  }
  
  .pagination span.page-numbers {
    display: inline-block;
    margin-top: 0;
  }
}
  </style>

      
      