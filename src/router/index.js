import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../Index.vue'
import MovieTotal from "../views/MovieTotal"
import Actor from "../views/Actor"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
    redirect: '/home'
  },
  {
    path: '/home',
    component: MovieTotal,
  },
  {
    path: '/actor',
    component: Actor,
  },
]

const router = new VueRouter({
  routes
})

export default router
