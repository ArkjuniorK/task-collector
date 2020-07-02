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
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/students',
    name: 'Students',
    component: () =>
      import(/* webpackChunkName: "teacher" */ '../views/Students.vue')
  },
  {
    path: '/task/:id',
    name: 'ViewTask',
    component: () =>
      import(/* webpackChunkName: "taskView" */ '../views/ViewTask.vue')
  },
  {
    path: '/create',
    name: 'Create',
    component: () =>
      import(/* webpackChunkName: "createParent" */ '../views/Create.vue'),
    children: [
      {
        path: 'task',
        name: 'CreateTask',
        component: () =>
          import(/* webpackChunkName: "taskCreate" */ '../views/CreateTask.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'text-light-300',
  base: process.env.BASE_URL,
  routes
})

/* navigation guard */
router.beforeEach((to, from, next) => {
  /* define the teacher and student fro store */
  const teacher = store.state.teacher
  const student = store.state.student

  if (to.name === 'Error') return next()

  if (to.fullPath === '/login') {
    if (teacher.idNumber || student.idNumber) next('/')
    else next()
  }

  if (to.name === 'Home') {
    if (!teacher.idNumber) next('/login')
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
})

export default router
