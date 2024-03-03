import AuthViewLayout from '@/components/layouts/auth.vue'
import LoginView from '@/pages/auth/login/index.vue'

export default [
  {
    path: '/auth',
    meta: {
      layoutComponent: AuthViewLayout,
    },
    children: [
      {
        path: 'login',
        component: LoginView,
      },
    ],
  },
]
