<template>
  <div id="theme">
    <div
      id="no-theme"
      v-if="themes.length < 1"
      class="flex flex-col items-center justify-around"
    >
      <div class="flex flex-col items-center ">
        <sad-emot></sad-emot>
        <span class="my-3 text-sm font-display">Tidak Ada Tema</span>
      </div>
    </div>
    <div
      id="theme-existed"
      v-if="themes.length >= 1"
      class="task-grid grid grid-cols-2 gap-3 xl:grid-cols-3 xxl:grid-cols-4 xl:gap-6 xxxl:gap-6"
    >
      <data-card
        v-for="(theme, index) in themes"
        :key="index"
        :title="theme.title"
        :subject="theme.name"
        :subtheme="theme.subthemes"
        :class="[theme.background, 'xl:rounded-lg']"
      ></data-card>
    </div>
    <div id="pagination" class="mt-6">
      <scroll-pagination
        @load="addCurrentPage"
        :currentPage="currentPage"
        :totalPages="themePagination.totalPage"
        :totalRecords="themePagination.totalThemes"
        :totalData="themes.length"
      ></scroll-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Theme',
  components: {
    sadEmot: () => import('../components/illustration/SadEmot'),
    dataCard: () => import('../components/complements/TaskCard'),
    scrollPagination: () => import('../components/ScrollPagination')
  },
  data: () => ({
    dataThemes: []
  }),
  computed: {
    ...mapState(['themes', 'currentPage', 'themePagination'])
  },
  methods: {
    ...mapMutations(['SET_CURRENT_PAGE', 'SET_DATA_TYPE'])
  },
  created() {},
  async mounted() {
    this.refreshCurrentPage()
    this.getThemes()
  }
}
</script>
