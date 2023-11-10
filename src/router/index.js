import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import DashboardView from '../views/DashboardView.vue'
import InformationView from '../views/InformationView.vue'
import InspectionsList from '../components/InspectionsList.vue'
import InspectionForm from '../components/InspectionForm.vue'
import KnowledgeBase from '../components/KnowledgeBase.vue'
import TestProcedures from '../components/TestProcedures.vue'
import DocumentationModifications from '../components/DocumentationModifications.vue'
import { nextTick } from 'vue'

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
  },
  {
    path: '/inloggen',
    name: 'inloggen',
    component: () => import('../views/LoginView.vue'),
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/registreren',
    name: 'registreren',
    component: () => import('../views/RegisterView.vue'),
    meta: {
      requiresAuth: false,
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth !== false)) {
    if (await getCurrentUser()) {
      next();
    } else {
      console.log("You don't have access!");
      next("/inloggen");
    }
  } else {
    next();
  }
})

export default router
