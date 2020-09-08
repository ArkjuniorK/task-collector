<template>
  <div id="subtheme">
    <div
      id="no-subtheme"
      v-if="subthemes.length < 1"
      class="flex flex-col items-center justify-around"
    >
      <div class="flex flex-col items-center">
        <sad-emot></sad-emot>
        <span class="my-3 text-sm font-display">Tidak Ada Tema</span>
      </div>
    </div>
    <div
      id="subtheme-existed"
      v-if="subthemes.length >= 1"
      class="task-grid grid grid-cols-2 gap-3 xl:grid-cols-3 xxl:grid-cols-4 xl:gap-6 xxxl:gap-6"
    >
      <data-card
        v-for="(subtheme, index) in subthemes"
        :key="index"
        :title="subtheme.title"
        :subject="subtheme.name"
        :subtheme="subtheme.tasks"
        :class="[subtheme.background, 'xl:rounded-lg']"
      ></data-card>
    </div>
    <div id="pagination" class="mt-6">
      <scroll-pagination
        @load="addCurrentPage"
        :currentPage="currentPage"
        :totalPages="subthemePagination.totalPage"
        :totalRecords="subthemePagination.totalSubthemes"
        :totalData="subthemes.length"
      ></scroll-pagination>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  'subtheme'
)

export default {
  name: 'Subtheme'
  /* components: {
    sadEmot: () => import('../components/illustration/SadEmot'),
    dataCard: () => import('../components/complements/TaskCard'),
    scrollPagination: () => import('../components/ScrollPagination')
  },
  data: () => ({
    currentPage: 1
  }),
  computed: {
    ...mapState(['subthemes', 'subthemePagination'])
  },
  methods: {
    addCurrentPage() {
      this.currentPage++
      localStorage.themePage = this.currentPage
    },
    refreshCurrentPage() {
      this.currentPage = 1
    },
    ...mapMutations(['SET_DATA_TYPE']),
    ...mapActions(['getSubthemes'])
  },
  watch: {
    currentPage() {
      this.getSubthemes(this.currentPage)
    }
  },
  created() {
    this.SET_DATA_TYPE('subtheme')
  },
  mounted() {
    this.getSubthemes(this.currentPage)
  }
 */
}
</script>
