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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/* navigation guard */
router.beforeEach((to, from, next) => {
  /* define the teacher and student fro store */
  const teacher = store.state.teacher
  const student = store.state.student

  if (to.fullPath === '/') {
    if (!teacher.idNumber) {
      next('/login')
    }

    next()
  }

  if (to.fullPath === '/login') {
    if (teacher.idNumber) {
      next('teacher')
    } else if (student.idNumber) {
      next('/student')
    } else {
      next()
    }
  }
})

export default router
