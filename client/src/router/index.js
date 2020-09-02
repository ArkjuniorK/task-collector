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
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    redirect: '/theme',
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'theme',
        name: 'Theme',
        component: () =>
          import(/* webpackChunkName: "theme" */ '../components/Theme.vue')
      },
      {
        path: 'subtheme',
        name: 'Subtheme',
        component: () =>
          import(/* webpackChunkName: "theme" */ '../components/Theme.vue')
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
    component: () =>
      import(/* webpackChunkName: "teacher" */ '../views/Students.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/theme/view/:id',
    name: 'ViewTheme',
    meta: { requiresAuth: true }
  },
  {
    path: '/theme/create',
    name: 'CreateTheme',
    meta: { requiresAuth: true }
  },
  {
    path: '/subtheme/view/:id',
    name: 'ViewSubtheme',
    meta: { requiresAuth: true }
  },
  {
    path: '/subtheme/create',
    name: 'CreateSubtheme',
    meta: { requiresAuth: true }
  },
  {
    path: '/task/view/:id',
    name: 'ViewTask',
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

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'text-light-300',
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

/* navigation guard */
/*router.beforeEach((to, from, next) => {
   define the teacher and student fro store 
  const teacher = store.state.teacher
  const student = store.state.student

  if (to.name === 'Error') return next()

  if (to.name === 'Login') {
    if (teacher.idNumber || student.idNumber) next('/')
    else next()
  }

  if (to.name === 'Register') return next()

  if (to.name === 'Home') {
    if (!teacher.idNumber || !student.idNumber) next('/login')
    else if (from.name === 'Register') next()
    else next()
  }

  if (to.name === 'Students') {
    if (teacher.idNumber) next()
    else next('/login')
  }

  if (to.name === 'ViewTask') {
    if (teacher.idNumber) next()
    else next('/')
  }

  if (to.name === 'Create') next('/')

  if (to.name === 'CreateTask') {
    if (teacher.idNumber) next()
    else next('/')
  }
}) */

export default router
