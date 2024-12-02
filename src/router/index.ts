import { createRouter, createWebHistory } from 'vue-router'

import NotFoundView from '@/views/NotFoundView.vue';

const routes = [
  { path: '/', component: () => import("@/views/DashboardView.vue") },
  { path: '/tasks', component: () => import("@/views/TasksView.vue") },
  { path: '/tasks/add', component: () => import("@/views/AddTaskView.vue")  },
  { path: '/tasks/:id', component: () => import("@/views/TaskView.vue") },
  { path: '/settings', component: () => import("@/views/SettingsView.vue") },
  { path: '/:catchAll(.*)', component: NotFoundView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;