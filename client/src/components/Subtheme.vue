<template>
  <div id="subtheme">
    <div
      v-if="subthemes.length < 1"
      id="no-subtheme"
      class="flex flex-col items-center justify-around h-screen-50"
    >
      <div class="flex flex-col items-center">
        <sad-emot></sad-emot>
        <span class="my-3 text-sm font-display">Tidak Ada Tema</span>
      </div>
    </div>
    <div
      v-if="subthemes.length >= 1"
      id="subtheme-existed"
      class="task-grid grid grid-cols-2 gap-3 xl:grid-cols-3 xxl:grid-cols-4 xl:gap-6 xxxl:gap-6"
    >
      <data-card
        v-for="(subtheme, index) in subthemes"
        :key="index"
        :title="subtheme.title"
        :subject="subtheme.name"
        :task="subtheme.tasks"
        :class="[subtheme.background, 'xl:rounded-lg']"
        @cardClicked="gotoSubtheme(subtheme.id)"
        @btnClicked="gotoSubtheme(subtheme.id)"
      ></data-card>
    </div>
    <div id="pagination" class="mt-6">
      <scroll-pagination
        :current-page="currentPage"
        :total-pages="pagination.totalPage"
        :total-records="pagination.totalSubthemes"
        :total-data="subthemes.length"
        @load="addCurrentPage"
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
  name: 'Subtheme',
  components: {
    sadEmot: () => import('../components/illustration/SadEmot'),
    dataCard: () => import('../components/complements/TaskCard'),
    scrollPagination: () => import('../components/ScrollPagination')
  },
  computed: {
    ...mapState({
      subthemes: state => state.data,
      currentPage: state => state.currentPage,
      pagination: state => state.pagination
    })
  },
  watch: {
    currentPage() {
      this.getSubthemes()
    }
  },
  mounted() {
    this.getSubthemes()
  },
  methods: {
    addCurrentPage() {
      this.SET_CURRENT_PAGE(1)
    },
    refreshCurrentPage() {
      this.SET_CURRENT_PAGE(-1)
    },
    gotoSubtheme(v) {
      this.$router.push({ name: 'viewSubtheme', params: { id: v } })
    },
    ...mapMutations(['SET_CURRENT_PAGE']),
    ...mapActions(['getSubthemes'])
  }
}
</script>
