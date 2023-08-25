<!-- ConfirmModal.vue -->
<template>
    <div class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmation</h5>
            <button type="button" class="close" @click="cancelConfirmation">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Are you sure you want to perform this action?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cancelConfirmation">Cancel</button>
            <button type="button" class="btn btn-primary" @click="confirmAction">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      cancelConfirmation() {
        this.$emit('cancel'); // Emit the "cancel" event
      },
      confirmAction() {
        this.$emit('confirm'); // Emit the "confirm" event
      },
    },
  };
  </script>
  
  <style scoped>
  /* Modal styles ... */
  </style>
 <div class="sort-container">
    <span class="sort-text">Sort By:</span>
    <select v-model="sortBy" class="sort-dropdown" @change="sortByFirstName">
  <option value="asc">Ascending</option>
  <option value="desc">Descending</option>
</select>  