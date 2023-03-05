import { createRouter, createWebHistory } from 'vue-router'
import BoardsView from '@/views/BoardsView.vue'
import BoardView from '@/views/BoardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/boards'
    },
    {
      path: '/boards',
      name: 'boards',
      component: BoardsView
    },
    {
      path: '/boards/:id',
      props: true,
      component: BoardView
    }
  ]
})

export default router
