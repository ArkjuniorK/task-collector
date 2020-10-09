<template>
  <nav
    id="navbar"
    class="fixed top-0 w-full px-4 py-2 bg-white border-b shadow-sm lg:py-2 xxl:py-4 border-light-300"
  >
    <div class="relative child">
      <div class="z-0 flex items-center justify-center one xl:mx-5">
        <a id="right" href="/" class="flex">
          <svg-logo></svg-logo>
        </a>
        <div id="left" class="items-center ml-auto" :class="display">
          <div v-show="status" class="action-one xs:hidden xl:block">
            <my-btn
              btn-type="button"
              btn-class="flex-row-reverse rounded-full text-dark-200 hover:bg-opacity-75 p-1 xxl:p-2 text-sm xxl:text-base"
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
            <my-btn
              btn-type="button"
              btn-class="font-bold text-md "
              @clicked="$emit('openMenu')"
            >
              {{ username }}
              <template v-slot:icon>
                <div class="ml-2">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.66663 14.6667H7.33329V18.3333H3.66663V14.6667ZM9.16663 3.66668H12.8333V7.33334H9.16663V3.66668ZM3.66663 3.66668H7.33329V7.33334H3.66663V3.66668ZM3.66663 9.16668H7.33329V12.8333H3.66663V9.16668ZM9.16663 9.16668H12.8333V12.8333H9.16663V9.16668ZM14.6666 18.3333V14.6667H18.3333V18.3333H14.6666ZM9.16663 14.6667H12.8333V18.3333H9.16663V14.6667ZM14.6666 9.16668H18.3333V12.8333H14.6666V9.16668ZM14.6666 3.66668H18.3333V7.33334H14.6666V3.66668Z"
                      fill="#3F5359"
                    />
                  </svg>
                </div>
              </template>
            </my-btn>
          </div>
        </div>
      </div>
      <div
        class="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center w-6/12 mx-auto two xs:hidden xl:flex xxl:text-lg"
      >
        <div v-show="status" :class="display" class="nav-link font-display">
          <router-link to="/home" class="mr-2">Tugas</router-link>
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
      return this.user.frontName
    },
    status() {
      return this.userType === 'teacher' ? 1 : -1
    },
    ...mapState(['user', 'userType'])
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
