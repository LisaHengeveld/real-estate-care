import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import InformationView from '../views/InformationView.vue'
import Inspections from '../components/Inspections.vue'
import InspectionDetails from '../components/InspectionDetails.vue'
import KnowledgeBase from '../components/KnowledgeBase.vue'
import TestProcedures from '../components/TestProcedures.vue'
import DocumentationModifications from '../components/DocumentationModifications.vue'

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
  },
  {
    path: '/kennisbase',
    name: 'kennisbase',
    component: KnowledgeBase
  },
  {
    path: '/testprocedures',
    name: 'testprocedures',
    component: TestProcedures
  },
  {
    path: '/documentatie-modificaties',
    name: 'documentatie-modificaties',
    component: DocumentationModifications
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
