<template>
  <div
    id="app"
    class="text-center relative h-screen flex flex-col justify-between"
  >
    <div class="header-main">
      <header id="header" class="relative z-10">
        <navbar @openMenu="showNavbar" @closeMenu="closeNavbar" />
      </header>
      <main class="pt-16 flex flex-row relative overflow-hidden">
        <section id="view" class="w-screen lg:mt-10">
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
    </div>

    <footer
      class="left-0 right-0 p-3 border-t border-light-300 bg-light-100 relative bottom-0"
    >
      <span class="name font-display text-sm">ArkjuniorK</span>
    </footer>
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
  line-height: 1.25 !important;
}

/* #nav a.router-link-exact-active {
  color: #42b983;
}  */
</style>
