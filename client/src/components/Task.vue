<template>
  <div id="task">
    <div
      v-if="tasks.length < 1"
      id="no-task"
      class="flex flex-col items-center justify-around h-screen-50"
    >
      <div class="flex flex-col items-center">
        <sad-emot></sad-emot>
        <span class="my-3 text-sm font-display">Tidak Ada Tugas</span>
      </div>
    </div>
    <div
      v-else
      id="task-existed"
      class="task-grid grid grid-cols-2 gap-3 xl:grid-cols-3 xxl:grid-cols-4 xl:gap-6 xxxl:gap-6"
    >
      <data-card
        v-for="(task, index) in tasks"
        :key="index"
        :title="task.name"
        :subject="task.subjectName"
        :date="task.date"
        :class="[task.background, 'xl:rounded-lg']"
        @cardClicked="gotoTask(task.id)"
        @btnClicked="gotoTask(task.id)"
      ></data-card>
    </div>
    <div id="pagination" class="mt-6">
      <scroll-pagination
        :current-page="currentPage"
        :total-pages="pagination.totalPage"
        :total-records="pagination.totalSubthemes"
        :total-data="tasks.length"
        @load="addCurrentPage"
      ></scroll-pagination>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapMutations, mapActions } = createNamespacedHelpers('task')

export default {
  name: 'Task',
  components: {
    sadEmot: () => import('../components/illustration/SadEmot'),
    dataCard: () => import('../components/complements/TaskCard'),
    scrollPagination: () => import('../components/ScrollPagination')
  },
  computed: {
    ...mapState({
      tasks: state => state.data,
      currentPage: state => state.currentPage,
      pagination: state => state.pagination
    })
  },
  watch: {
    currentPage() {
      this.getTasks()
    }
  },
  mounted() {
    this.getTasks()
  },
  methods: {
    addCurrentPage() {
      this.SET_CURRENT_PAGE(1)
    },
    refreshCurrentPage() {
      this.SET_CURRENT_PAGE(-1)
    },
    gotoTask(v) {
      this.$router.push({ name: 'viewTask', params: { id: v } })
    },
    ...mapMutations(['SET_CURRENT_PAGE']),
    ...mapActions(['getTasks'])
  }
}
</script>
