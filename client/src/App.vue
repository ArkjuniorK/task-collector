<template>
  <div
    id="app"
    class="relative flex flex-col justify-between h-screen text-center"
  >
    <div class="header-main">
      <header id="header" class="relative z-10">
        <navbar @openMenu="showNavbar" />
      </header>
      <main class="pt-16">
        <section id="view" class="w-full lg:mt-10 xl:mt-4 xxl:mt-10">
          <router-view />
        </section>
      </main>
    </div>
    <aside
      :class="translateX"
      class="fixed right-0 z-20 flex flex-col justify-between h-screen shadow-md transition duration-500 transform w-320px bg-light-100 xl:hidden"
    >
      <div class="text">
        <div class="flex justify-between p-2 mx-3 upper">
          <span class="font-display">
            {{ teacher.name }}
          </span>
          <button
            id="menu-clse"
            @click="closeNavbar"
            class="w-6 p-1 rounded-sm menu focus:outline-none focus:bg-light-300 text-dark-200"
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
        </div>
        <div class="mx-5 mt-5 downer">
          <div
            class="flex flex-col py-6 rounded school-students font-display bg-red"
          >
            <span class="text-2xl font-black">
              {{ teacher.school.name }}
            </span>
            <div class="mt-2 text-lg class-students">
              <span class=""
                >Kelas
                {{ teacher.class[0].name }}
              </span>
              |
              <span class="">
                {{ teacher.students.length }}
                Siswa</span
              >
            </div>
          </div>
          <div class="my-4 button">
            <my-btn btnClass="bg-blue p-2 flex-row-reverse"
              >Tambah Tugas
              <template v-slot:icon>
                <div class="w-4 mr-2 icon">
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
          <div class="mt-6 navigation font-display">
            <div class="mx-4 mt-6 nav">
              <router-link
                to="/"
                class="flex items-center justify-between text-lg"
                exact-active-class="text-dark-400"
              >
                <span class="mr-4">Tugas</span>
                <span class="w-full border"></span>
              </router-link>
              <router-link
                to="/students"
                class="flex items-center justify-between mt-3 text-lg"
              >
                <span class="mr-4">Siswa</span>
                <span class="w-full border"></span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2 mx-auto mb-12 illustration">
        <task-svg></task-svg>
      </div>
    </aside>
    <footer
      class="relative bottom-0 left-0 right-0 p-3 border-t border-light-300 bg-light-100"
    >
      <span class="text-sm name font-display">ArkjuniorK</span>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    navbar: () => import('./components/Navbar'),
    taskSvg: () => import('./components/illustration/TaskSvg'),
    myBtn: () => import('./components/complements/Button')
  },
  data: () => ({
    translateX: 'translate-x-full'
  }),
  methods: {
    showNavbar() {
      this.translateX = 'translate-x-0'
    },
    closeNavbar() {
      this.translateX = 'translate-x-full'
    }
  },
  computed: {
    ...mapState(['teacher'])
  },
  mounted() {
    console.log(this.teacher)
  }
}
</script>

<style>
html {
  color: #2f3c40;
  line-height: 1.25 !important;
}
.w-320px {
  width: 320px;
  min-width: 320px;
}
</style>
