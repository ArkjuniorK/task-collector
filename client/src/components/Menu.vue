<template>
  <section id="menu-dropdown" class="fixed z-20 w-full ">
    <div
      id="menu-child"
      class="block mx-5 border shadow-sm border-dark-400 border-opacity-25 bg-light-100 rounded-md"
      :class="menuTransition"
    >
      <div
        id="child-one"
        class="my-8 font-sans text-xl font-black text-dark-200"
      >
        <span>{{ user.frontName }}</span>
        <br />
        <span>{{ user.backName }}</span>
      </div>
      <div id="child-two" class="px-5 mt-8 text-left">
        <my-btn
          @clicked="$router.push('/')"
          class="flex-row-reverse p-2 text-left bg-blue-task text-dark-200 bg-opacity-25 text-md justify-end-custom"
          >Tambah Tema Baru
          <template v-slot:icon>
            <div id="icon" class="mx-2">
              <svg
                class="w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M7 0H6L0 3v6l4-1v12h12V8l4 1V3l-6-3h-1a3 3 0 0 1-6 0z"
                />
              </svg>
            </div>
          </template>
        </my-btn>
        <my-btn
          class="flex-row-reverse p-2 mt-3 text-left bg-orange-task text-dark-200 bg-opacity-25 text-md justify-end-custom"
          >Tambah Subtema Baru
          <template v-slot:icon>
            <div id="icon" class="mx-2">
              <svg
                class="w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M4 11H2a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h2V1h14v10a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zm0-2V5H2v4h2zm-2 8v-1h18v1l-4 2H6l-4-2z"
                />
              </svg>
            </div>
          </template>
        </my-btn>
        <my-btn
          class="flex-row-reverse p-2 mt-3 text-left bg-green-task text-dark-200 bg-opacity-25 text-md justify-end-custom"
          >Tambah Tugas Baru
          <template v-slot:icon>
            <div id="icon" class="mx-2">
              <svg
                class="w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M6 4H5a1 1 0 1 1 0-2h11V1a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V5a1 1 0 0 0-1-1h-7v8l-2-2-2 2V4z"
                />
              </svg>
            </div>
          </template>
        </my-btn>
      </div>
      <div
        id="child-three"
        class="flex py-4 mt-4 border-t border-opacity-25 border-dark-300"
      >
        <router-link to="/" class="w-full font-bold font-display"
          >Tugas</router-link
        >
        <router-link to="/siswa" class="w-full font-bold font-display"
          >Siswa</router-link
        >
      </div>
      <div
        id="child-four"
        class="flex flex-col py-5 font-sans text-sm border-t border-opacity-25 border-dark-300 bg-light-300 bg-opacity-25"
      >
        <span class="font-bold">{{ user.idNumber }}</span>
        <span>{{ user.school.name }}</span>
        <span>{{ user.class[0].name }} ({{ user.class[0].idNumber }})</span>
      </div>
      <div
        id="child-five"
        class="w-full py-5 border-t border-opacity-25 w border-dark-300"
      >
        <my-btn
          @clicked="logOutUser"
          btnClass="bg-red-task p-2 font-black w-24-custom mx-auto"
          >Keluar</my-btn
        >
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MenuAction',
  components: {
    myBtn: () => import('./complements/Button')
  },
  props: ['status'],
  computed: {
    menuTransition() {
      return this.status ? 'menu-show' : 'menu-hidden'
    },
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['logOutUser'])
  }
}
</script>

<style>
.menu-show {
  transition: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  transition-duration: 500ms;
  transition-property: all;
  animation: slideDOwn;
  animation-duration: 500ms;
}

@keyframes slideDOwn {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.menu-hidden {
  transition: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  transition-duration: 500ms;
  transition-property: all;
  animation: slideUp;
  animation-duration: 500ms;
}

@keyframes slideUp {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-10);
    opacity: 0;
  }
}
</style>
