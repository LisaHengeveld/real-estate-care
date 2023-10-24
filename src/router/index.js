import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import InformationView from '../views/InformationView.vue'
import Inspections from '../components/Inspections.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/informatie',
    name: 'informatie',
    component: InformationView
  },
  {
    path: '/inspectierapporten',
    name: 'inspectierapporten',
    component: Inspections
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
