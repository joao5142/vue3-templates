import AppViewDefaultLayout from '@/components/layouts/app/index.vue'

import HomeView from '@/pages/app/home/index.vue'

export default [
  {
    path: '/app',
    meta: {
      layoutComponent: AppViewDefaultLayout,
    },
    children: [
      {
        path: 'home',
        component: HomeView,
        meta: {
          showFooter: true,
        },
      },
    ],
  },
]
