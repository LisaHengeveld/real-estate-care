import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { nextTick } from 'vue'
import DashboardView from '../views/DashboardView.vue'
import InformationView from '../views/InformationView.vue'
import InspectionsList from '../components/InspectionsList.vue'
import InspectionForm from '../components/InspectionForm.vue'
import KnowledgeBase from '../components/KnowledgeBase.vue'
import FilesList from '../components/FilesList.vue'
import Settings from '../components/Settings.vue'
import UpdateEmail from '../components/UpdateEmail.vue'
import UpdateAvatar from '../components/UpdateAvatar.vue'
import ChangePassword from '../components/ChangePassword.vue'


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
    path: '/kennisbase/:subject',
    name: 'files',
    component: FilesList
  },
  {
    path: '/instellingen',
    name: 'instellingen',
    component: Settings
  },
  {
    path: '/instellingen/wijzig-email',
    name: 'wijzig-email',
    component: UpdateEmail
  },
  {
    path: '/instellingen/wijzig-profielfoto',
    name: 'wijzig-profielfoto',
    component: UpdateAvatar
  },
  {
    path: '/instellingen/wijzig-wachtwoord',
    name: 'wijzig-wachtwoord',
    component: ChangePassword
  },
  {
    path: '/inloggen',
    name: 'inloggen',
    component: () => import('../views/LoginView.vue'),
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
