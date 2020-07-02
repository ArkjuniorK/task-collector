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
          <div class="action-one xs:hidden xl:block">
            <my-btn
              btnType="button"
              btnClass="flex-row-reverse px-2 bg-blue text-dark-200 hover:bg-opacity-75 p-1 xxl:p-2 text-sm xxl:text-base"
              @clicked="$router.push('create/task')"
            >
              Tambah Tugas
              <template>
                <div class="w-4 mr-1 icon">
                  <svg
                    class="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
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
        v-if="teacher.idNumber"
        class="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center w-6/12 mx-auto two xs:hidden xl:flex xxl:text-lg"
      >
        <div class="nav-link font-display">
          <router-link to="/" class="mr-2">Tugas</router-link>
          <router-link to="/students" class="ml-2">Siswa</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

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
    display() {
      return this.$route.name == 'Login'
        ? 'hidden'
        : this.$route.name == 'Error'
        ? 'hidden'
        : 'flex'
    },
    username() {
      const teacher = this.teacher
      const student = this.student

      return teacher.idNumber
        ? teacher.name
        : student.idNumber
        ? student.name
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
    }
  },
  mounted() {}
}
</script>

<style>
.nav-link a.exact-active-class {
  color: blue;
}
</style>
