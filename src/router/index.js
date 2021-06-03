import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Explore from '../views/Explore.vue'
import Details from '../views/Details.vue'
import Trending from '../views/Trending.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore
  },
  {
    path: '/details',
    name: 'Details',
    component: Details
  },
  {
    path: '/trending',
    name: 'Trending',
    component: Trending
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
