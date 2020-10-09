import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'Error',
    component: () =>
      import(/* webpackChunkName: "error" */ '../views/Error.vue')
  },
  {
    path: '/',
    name: 'Root',
    redirect: '/home/theme'
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/home/theme',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'theme',
        name: 'Theme',
        component: () =>
          import(/* webpackChunkName: "theme" */ '../components/Theme.vue'),
        meta: {
          name: 'Tema'
        }
      },
      {
        path: 'subtheme',
        name: 'Subtheme',
        component: () =>
          import(
            /* webpackChunkName: "subtheme" */ '../components/Subtheme.vue'
          ),
        meta: {
          name: 'Subtema'
        }
      },
      {
        path: 'task',
        name: 'Task',
        component: () =>
          import(/* webpackChunkName: "task" */ '../components/Task.vue'),
        meta: {
          name: 'Tugas'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/students',
    name: 'Students',
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "teacher" */ '../views/Students.vue')
  },
  {
    path: '/home/theme/:id',
    name: 'viewTheme',
    meta: { requiresAuth: true },
    props: true,
    component: () =>
      import(/* webpackChunkNmae: "themeView" */ '../views/ViewTheme.vue')
  },
  {
    path: '/theme/create',
    name: 'createTheme',
    meta: { requiresAuth: true, groupName: 'Create Page' },
    component: () =>
      import(/* webpackChunckName: "themeCreate" */ '../views/CreateTheme.vue')
  },
  {
    path: '/home/subtheme/:id',
    name: 'viewSubtheme',
    meta: { requiresAuth: true },
    props: true,
    component: () =>
      import(
        /* webpackChunckName: "subthemeView" */ '../views/ViewSubtheme.vue'
      )
  },
  {
    path: '/subtheme/create',
    name: 'CreateSubtheme',
    meta: { requiresAuth: true }
  },
  {
    path: '/task/view/:id',
    name: 'viewTask',
    meta: { requiresAuth: true },
    props: true,
    component: () =>
      import(/* webpackChunkName: "taskView" */ '../views/ViewTask.vue')
  },
  {
    path: '/task/create',
    name: 'CreateTask',
    component: () =>
      import(/* webpackChunkName: "taskCreate" */ '../views/CreateTask.vue'),
    meta: { requiresAuth: true }
  }
]

global.router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'text-dark-300',
  linkActiveClass: 'text-dark-300',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = store.state.user
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (user.idNumber) next()
    else next('/login')
  } else {
    next()
  }
})

export default router
