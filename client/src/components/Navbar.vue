<template>
  <nav
    id="navbar"
    class="fixed top-0 w-full px-4 py-1 bg-white border-b lg:py-2 xxl:py-4 border-light-300"
  >
    <div class="relative child">
      <div class="z-0 flex items-center justify-center one xl:mx-5">
        <div id="right" class="flex">
          <svg-logo></svg-logo>
        </div>
        <div id="left" class="items-center ml-auto" :class="display">
          <div class="action-one xs:hidden xl:block" v-show="status">
            <my-btn
              btnType="button"
              btnClass="flex-row-reverse rounded-full text-dark-200 hover:bg-opacity-75 p-1 xxl:p-2 text-sm xxl:text-base"
              @clicked="$router.push({ name: 'CreateTask' })"
            >
              <template>
                <div class="w-3 transform rotate-45 icon">
                  <svg
                    class="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
                    />
                  </svg>
                </div>
              </template>
            </my-btn>
          </div>
          <div class="ml-3 username">
            <span
              class="text-sm font-black font-display text-dark-200 xl:text-base xxl:text-lg"
            >
              {{ username }}
            </span>
          </div>
          <div id="action-three" class="ml-3 xs:hidden xl:block">
            <my-btn
              @clicked="logOut"
              btnClass="bg-red text-light-40 xl:text-sm xl:p-1 xxl:py-1 xxl:px-2"
            >
              Keluar
              <template v-slot:icon>
                <div class="w-3 ml-1 rounded-full icon">
                  <svg
                    class="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 7H2v6h8v5l8-8-8-8v5z" />
                  </svg>
                </div>
              </template>
            </my-btn>
          </div>
          <div class="ml-2 action">
            <button
              id="menu-open"
              @click="openNavbar"
              class="w-6 p-1 rounded-sm menu focus:outline-none focus:bg-light-300 text-dark-200 xl:hidden"
            >
              <svg
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        class="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center w-6/12 mx-auto two xs:hidden xl:flex xxl:text-lg"
      >
        <div :class="display" v-show="status" class="nav-link font-display">
          <router-link to="/" class="mr-2">Tugas</router-link>
          <router-link to="/students" class="ml-2">Siswa</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Navbar',
  components: {
    SvgLogo: () => import('./complements/Logo'),
    myBtn: () => import('./complements/Button')
  },
  data: () => ({
    open: true
  }),
  computed: {
    status() {
      return this.student.idNumber ? false : true
    },
    display() {
      return this.$route.name == 'Login'
        ? 'hidden'
        : this.$route.name == 'Error'
        ? 'hidden'
        : this.$route.name == 'Register'
        ? 'hidden'
        : 'flex'
    },
    username() {
      const teacher = this.teacher
      const student = this.student

      return teacher.idNumber
        ? teacher.frontName
        : student.idNumber
        ? student.frontName
        : null
    },
    ...mapState(['teacher', 'student'])
  },
  methods: {
    openNavbar() {
      this.$emit('openMenu')
      this.open = false
    },
    closeNavbar() {
      this.$emit('closeMenu')
      this.open = true
    },
    async logOut() {
      this.logOutUser()
      this.$router.push({ name: 'Login' })
    },
    ...mapActions(['logOutUser'])
  }
}
</script>

<style>
.nav-link a.exact-active-class {
  color: blue;
}
</style>
