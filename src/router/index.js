import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import InformationView from '../views/InformationView.vue'
import Inspections from '../components/Inspections.vue'
import InspectionDetails from '../components/InspectionDetails.vue'

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
  },
  {
    path: '/inspectiedetails/:id/:city/:address',
    name: 'inspectiedetails',
    component: InspectionDetails
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
