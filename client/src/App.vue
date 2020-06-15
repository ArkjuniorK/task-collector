<template>
  <div id="app" class="text-center">
    <header class="header">
      <navbar />
    </header>
    <main class="py-16 mx-4 leading-snug">
      <router-view />
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
