<template>
  <div>
    
    <Navbar />
<router-view />
  </div>
</template>

<script>
import Navbar from "./Navbar.vue"

export default{
  props: {
  },

    components:{
  Navbar,
        
 },
}
</script>
