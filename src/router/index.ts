import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import RegisterForm from '../components/RegisterForm.vue'
import ResetPasswordRequest from '../components/ResetPasswordRequest.vue'
import ResetPasswordConfirm from '../components/ResetPasswordConfirm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: LoginForm
    },
    {
      path: '/register',
      component: RegisterForm
    },
    {
      path : '/resetPassword',
      component : ResetPasswordRequest
    },
    {
      path: '/resetPasswordConfirm',
      component : ResetPasswordConfirm
    }
  ],
})

export default router
