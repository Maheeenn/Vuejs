import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Signup from '@/components/Signup.vue'
import Login from '@/components/Login.vue';
import Dashboard from '@/components/Dashboard/dashboard.vue';
import Profile from '@/components/Dashboard/Profile.vue'
import Users from '@/components/Dashboard/Users.vue'
import Students from '@/components/Dashboard/Students.vue'
import Teachers from '@/components/Dashboard/Teachers.vue';
import jobFrom from '@/components/jobFrom.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/jobFrom',
    name: 'Job Form',
    component: jobFrom
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  
    children:[
      {
        path: "/Profile",
        name: "Profile",
        component: Profile,
      },
      {
        path: "/Users",
        name: "Users",
        component: Users,
      },
      {
        path: "/Students",
        name: "Students",
        component: Students,
      },
      {
        path: "/Teachers",
        name: "Teachers",
        component: Teachers,
      },
      
      
      
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
