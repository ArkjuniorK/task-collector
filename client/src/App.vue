<template>
  <div
    id="app"
    class="relative flex flex-col justify-between h-screen text-center"
  >
    <div class="header-main">
      <header id="header" class="relative z-10">
        <navbar @openMenu="menuStatus = !menuStatus" />
      </header>
      <main class="pt-16">
        <transition name="slide">
          <menu-action
            v-show="menuStatus"
            :status="menuStatus"
            @closeMenu="menuStatus = false"
          />
        </transition>
        <section id="view" class="w-full lg:mt-10 xl:mt-4 xxl:mt-10">
          <router-view />
        </section>
      </main>
    </div>
    <footer
      class="hidden xl:block relative bottom-0 left-0 right-0 p-3 border-t border-light-300 bg-light-100"
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
    menuAction: () => import('./components/Menu.vue')
  },
  data: () => ({
    menuStatus: false
  }),
  computed: {
    menuTransition() {
      return this.menu ? 'menu-show' : 'menu-hidden'
    },
    showFooter() {
      return this.route.meta.groupName == 'Create Page' ? 'hidden' : ''
    },

    ...mapState(['user', 'route'])
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
.justify-end-custom {
  justify-content: flex-end !important;
}
.w-24-custom {
  width: 6rem !important;
}
</style>
