<template>
  <div id="theme">
    <div
      v-if="themes.length == 0"
      id="no-theme"
      class="flex flex-col items-center justify-around h-screen-50"
    >
      <div class="flex flex-col items-center">
        <sad-emot></sad-emot>
        <span class="my-3 text-sm font-display">Tidak Ada Tema</span>
      </div>
    </div>
    <div
      v-if="themes.length >= 1"
      id="theme-existed"
      class="task-grid grid grid-cols-2 gap-3 xl:grid-cols-4 xl:gap-6 xxxl:gap-6"
    >
      <data-card
        v-for="(theme, index) in themes"
        :key="index"
        :title="theme.title"
        :subject="theme.name"
        :subtheme="theme.subthemes"
        :class="[theme.background, 'xl:rounded-lg']"
        @cardClicked="gotoTheme(theme.id)"
        @btnClicked="gotoTheme(theme.id)"
      ></data-card>
    </div>
    <div id="pagination" class="my-6">
      <scroll-pagination
        :current-page="currentPage"
        :total-pages="pagination.totalPage"
        :total-records="pagination.totalThemes"
        :total-data="themes.length"
        @load="addCurrentPage"
      ></scroll-pagination>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('theme')

/* 🔥 Use theme's module from Vuex 🔥 */

export default {
  name: 'Theme',
  components: {
    sadEmot: () => import('../components/illustration/SadEmot'),
    dataCard: () => import('../components/complements/TaskCard'),
    scrollPagination: () => import('../components/ScrollPagination')
  },
  computed: {
    ...mapState({
      themes: state => state.data,
      currentPage: state => state.currentPage,
      pagination: state => state.pagination
    })
  },
  watch: {
    currentPage() {
      this.getThemes()
    }
  },
  async mounted() {
    this.getThemes()
  },
  methods: {
    addCurrentPage() {
      this.SET_CURRENT_PAGE(1)
    },
    refreshCurrentPage() {
      this.SET_CURRENT_PAGE(-1)
    },
    gotoTheme(v) {
      this.$router.push({ name: 'viewTheme', params: { id: v } })
    },
    ...mapMutations(['SET_CURRENT_PAGE']),
    ...mapActions(['getThemes'])
  }
}
</script>
