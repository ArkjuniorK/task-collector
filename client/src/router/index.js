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
        beforeEnter: (to, from, next) => {
          // from view theme
          if (from.name === 'viewTheme') {
            store.commit('theme/SET_PAGINATION', 1)
            store.commit('theme/RESET_DATA')
            store.dispatch('theme/getThemes')
          }

          // from other page
          store.dispatch('theme/getThemes')
          next()
        },
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
      import(/* webpackChunkNmae: "themeView" */ '../views/view/ViewTheme.vue')
  },
  {
    path: '/theme/create',
    name: 'createTheme',
    meta: { requiresAuth: true, groupName: 'Create Page' },
    component: () =>
      import(
        /* webpackChunckName: "themeCreate" */ '../views/create/CreateTheme.vue'
      )
  },
  {
    path: '/home/subtheme/:id',
    name: 'viewSubtheme',
    meta: { requiresAuth: true },
    props: true,
    component: () =>
      import(
        /* webpackChunckName: "subthemeView" */ '../views/view/ViewSubtheme.vue'
      )
  },
  {
    path: '/subtheme/create',
    name: 'createSubtheme',
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunckName: "subthemeCreate" */ '../views/create/CreateSubtheme.vue'
      )
  },
  {
    path: '/task/view/:id',
    name: 'viewTask',
    meta: { requiresAuth: true },
    props: true,
    component: () =>
      import(/* webpackChunkName: "taskView" */ '../views/view/ViewTask.vue')
  },
  {
    path: '/task/create',
    name: 'CreateTask',
    component: () =>
      import(
        /* webpackChunkName: "taskCreate" */ '../views/create/CreateTask.vue'
      ),
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
