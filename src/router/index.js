import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import InformationView from '../views/InformationView.vue'
import InspectionsList from '../components/InspectionsList.vue'
import InspectionForm from '../components/InspectionForm.vue'
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
    path: '/inspectierapporten/:type',
    name: 'inspectierapporten',
    component: InspectionsList
  },
  {
    path: '/inspectieformulier/:id/:city/:address',
    name: 'inspectieformulier',
    component: InspectionForm
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
