<template>
  <nav
    id="navbar"
    class="px-4 py-1 lg:py-2 xxl:py-4 border-b border-light-300 fixed bg-white w-full top-0"
  >
    <div class="child relative">
      <div class="one flex z-0 justify-center items-center">
        <div id="right" class="flex">
          <svg-logo></svg-logo>
        </div>
        <div id="left" class="ml-auto items-center" :class="display">
          <div class="action-one xs:hidden">
            <button
              class="add w-8 p-2 focus:outline-none text-dark-200 rounded-full hover:bg-light-200"
            >
              <svg
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
                />
              </svg>
            </button>
          </div>
          <div class="username ml-2">
            <span class="font-display font-bold text-dark-200 text-sm">
              {{ username }}
            </span>
          </div>
          <div class="action ml-2">
            <button
              v-if="!open"
              id="menu-clse"
              @click="closeNavbar"
              class="menu w-8 p-1 focus:outline-none focus:bg-light-300 rounded-sm text-dark-200"
            >
              <svg
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
                />
              </svg>
            </button>

            <button
              v-if="open"
              id="menu-open"
              @click="openNavbar"
              class="menu w-8 p-1 focus:outline-none focus:bg-light-300 rounded-sm text-dark-200"
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
        class="two absolute z-10 right-0 left-0 top-0 bottom-0 flex items-center justify-center xs:hidden"
      >
        <div class="nav-link font-display">
          <a href="/about" class="mr-1">Tugas</a>
          <a href="#" class="ml-1">Siswa</a>
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
    SvgLogo: () => import('@/components/Logo')
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
  mounted() {
    console.log(this.$mq)
  }
}
</script>
