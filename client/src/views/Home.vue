<template>
  <div id="home" class="w-full">
    <div class="home-child">
      <recent-task
        v-if="recentStatus"
        recentClass="mx-5 md:mx-32 lg:mx-48 xl:mx-10 xxl:mx-16 xxxl:mx-64 mb-4 xl:mb-10"
      ></recent-task>
      <main-section
        subClass="mx-5 h-full md:mx-32 md:py-6 lg:mx-48 xl:mx-10 xxl:mx-16 xxxl:mx-64"
      >
        <template v-slot:left-one>
          <div class="flex items-center upper-left text-dark-200">
            <div class="w-4 mr-3 icon">
              <svg
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M0 2C0 .9.9 0 2 0h16a2 2 0 0 1 2 2v2H0V2zm1 3h18v13a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5zm6 2v2h6V7H7z"
                />
              </svg>
            </div>
            <div class="title">
              <span class="text-sm font-display lg:text-base xxl:text-lg"
                >Daftar {{ type }}</span
              >
            </div>
          </div>
        </template>
        <template v-slot:center-one>
          <div id="center">
            <!-- <search-input
              routeName="Home"
              srClass="xs:hidden xl:flex xxl:text-lg"
              placeholder="Cari Tugas atau Mata Pelajaran"
            >
              <template v-slot:icon>
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                  />
                </svg>
              </template>
            </search-input> -->
            <div id="two" class="justify-center xl:flex xs:hidden">
              <my-btn
                :class="['p-3 text-dark-200 text-lg', themeStatus]"
                @clicked="setTheme"
                >Tema</my-btn
              >
              <my-btn
                :btnClass="['p-3 text-dark-200 mx-2 text-lg', subthemeStatus]"
                @clicked="setSubtheme"
                >Subtema</my-btn
              >
              <my-btn
                :btnClass="['p-3 text-dark-200 text-lg', taskStatus]"
                @clicked="setTask"
                >Tugas</my-btn
              >
            </div>
          </div>
        </template>
        <template v-slot:right-one>
          <div class="upper-right">
            <div id="one">
              <my-btn
                class="flex-row-reverse p-2 bg-light-200 text-dark-200 xl:hidden"
                @clicked="$router.push('/search')"
              >
                Cari
                <template v-slot:icon>
                  <div class="w-3 mr-2 icon">
                    <svg
                      class="fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                      />
                    </svg>
                  </div>
                </template>
              </my-btn>
            </div>
            <div id="two" class="flex items-center">
              <div id="right" class="flex"></div>
            </div>
          </div>
        </template>
        <template v-slot:center-two>
          <div
            id="right"
            class="flex items-center justify-center font-display text-dark-100"
          >
            <!-- <my-btn
              :class="['p-2 text-dark-200', themeStatus]"
              @clicked="setTheme"
              >Tema</my-btn
            >
            <my-btn
              :class="['p-2 text-dark-200', subthemeStatus]"
              @clicked="setSubtheme"
              >Subtema</my-btn
            >
            <my-btn
              :class="['p-2 text-dark-200', taskStatus]"
              @clicked="setTask"
              >Tugas</my-btn
            > -->
            <router-link
              class="w-full p-2"
              exact-active-class="border-b bg-blue-task bg-opacity-25 border-blue-task"
              :to="{ name: 'Theme' }"
            >
              Tema
            </router-link>
            <router-link
              class="w-full p-2"
              exact-active-class="border-b bg-orange-task bg-opacity-25 border-orange-task"
              :to="{ name: 'Subtheme' }"
              >Subtema</router-link
            >
            <router-link
              class="w-full p-2"
              :to="{ name: 'Task' }"
              exact-active-class="border-b bg-green-task bg-opacity-25 border-green-task"
              >Tugas</router-link
            >
          </div>
        </template>
        <template v-slot:content>
          <div class="content">
            <router-view></router-view>
          </div>
        </template>
      </main-section>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'

// @ is an alias to /src
export default {
  name: 'Home',
  components: {
    recentTask: () => import('../components/RecentTask'),
    mainSection: () => import('../components/MainSection'),
    /* dataCard: () => import('../components/complements/TaskCard'), */
    /* scrollPagination: () => import('../components/ScrollPagination'), */
    myBtn: () => import('../components/complements/Button')
    /* sadEmot: () => import('../components/illustration/SadEmot') */
  },
  data: () => ({
    dataList: [],
    dataThemes: [],
    dataSubthemes: [],
    dataTasks: [],
    condition: false
  }),
  computed: {
    themeStatus() {
      return this.dataType === 'theme'
        ? 'bg-blue-task bg-opacity-25 border-b border-blue-task no-round text-dark-400'
        : ''
    },
    subthemeStatus() {
      return this.dataType === 'subtheme'
        ? 'bg-orange-task bg-opacity-25 border-b no-round border-orange-task text-dark-400'
        : ''
    },
    taskStatus() {
      return this.dataType === 'task'
        ? 'bg-green-task bg-opacity-25 border-b no-round border-green-task text-dark-400'
        : ''
    },
    type() {
      return this.dataType === 'theme'
        ? 'Tema'
        : this.dataType === 'subtheme'
        ? 'Subtema'
        : 'Tugas'
    },
    recentStatus() {
      return this.recents.length > 0 ? 1 : -1
    },
    ...mapState([
      'pagination',
      'currentPage',
      'dataType',
      'themes',
      'subthemes',
      'recents'
    ])
  },
  methods: {
    addCurrentPage() {
      let one = 1
      this.SET_CURRENT_PAGE(one)
    },
    refreshCurrentPage() {
      let minOne = -1
      this.SET_CURRENT_PAGE(minOne)
    },
    setTheme() {
      this.refreshCurrentPage()
      this.$router.push({ name: 'Theme' })
      this.SET_DATA_TYPE('theme')
    },
    setSubtheme() {
      this.refreshCurrentPage()
      this.$router.push({ name: 'Subtheme' })
      this.SET_DATA_TYPE('subtheme')
    },
    setTask() {
      this.refreshCurrentPage()
      this.SET_DATA_TYPE('task')
    },
    ...mapMutations(['SET_CURRENT_PAGE', 'SET_DATA_TYPE']),
    ...mapActions(['getTask', 'getThemes', 'getSubthemes'])
  },
  watch: {},
  async mounted() {
    /* 
			when the page is refreshed, it will trigger the created hook
			and run the function below async

			the 'refreshCurrentPage()' will reset the page to 1
			and then run the 'getTasks()' to get the list of task based on
			'this.currentPage'
		*/
    /* this.refreshCurrentPage()
    switch (this.dataType) {
      case 'theme':
        this.getThemes()
        break
      case 'subtheme':
        this.getSubthemes()
        break
      case 'task':
    } */
  }
}
</script>

<style>
.no-round {
  border-radius: 0 !important;
}
.w-custom {
  width: 60%;
}
</style>
