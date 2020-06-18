<template>
  <div id="app" class="text-center">
    <header id="header" class="relative z-10">
      <navbar @openMenu="showNavbar" @closeMenu="closeNavbar" />
    </header>
    <main class="pt-16 mx-4 flex flex-row relative overflow-hidden">
      <section id="view" class="w-screen">
        <router-view />
      </section>

      <section
        id="side-navbar"
        class="w-screen absolute transition duration-500 transform bg-light-300"
        :class="translateX"
      >
        Hello
      </section>
    </main>
    <!-- <footer class="left-0 right-0 p-3 border-t border-light-300 bg-light-100">
      <span class="name font-display">ArkjuniorK</span>
    </footer> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    navbar: () => import('./components/Navbar')
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
  }
}
</script>

<style>
html {
  color: #2f3c40;
  line-height: 1 !important;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
