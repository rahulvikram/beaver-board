import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { 
    path: '/', 
    component: () => import('../components/login.vue')
  },
  {
    path: '/login',
    redirect: '/'
  },
  { 
    path: '/dashboard', 
    component: () => import('../components/dashboard.vue'),
    children: [
      {
        path: '', // default child route
        component: () => import('../components/partials/timeline.vue')
      },
      {
        path: 'classes',
        component: () => import('../components/partials/classes.vue')
      },
      {
        path: 'profile',
        component: () => import('../components/partials/profile.vue')
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})