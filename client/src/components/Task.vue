<template>
  <div id="task">
    <div
      id="no-task"
      v-if="tasks.length < 1"
      class="flex flex-col items-center justify-around h-screen-50"
    >
      <div class="flex flex-col items-center">
        <sad-emot></sad-emot>
        <span class="my-3 text-sm font-display">Tidak Ada Tugas</span>
      </div>
    </div>
    <div
      id="task-existed"
      v-if="tasks.length >= 1"
      class="task-grid grid grid-cols-2 gap-3 xl:grid-cols-3 xxl:grid-cols-4 xl:gap-6 xxxl:gap-6"
    >
      <data-card
        v-for="(task, index) in tasks"
        :key="index"
        :title="task.name"
        :subject="task.subjectName"
        :date="task.date"
        :class="[task.background, 'xl:rounded-lg']"
      ></data-card>
    </div>
    <div id="pagination" class="mt-6">
      <scroll-pagination
        @load="addCurrentPage"
        :currentPage="currentPage"
        :totalPages="pagination.totalPage"
        :totalRecords="pagination.totalSubthemes"
        :totalData="tasks.length"
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
  methods: {
    addCurrentPage() {
      this.SET_CURRENT_PAGE(1)
    },
    refreshCurrentPage() {
      this.SET_CURRENT_PAGE(-1)
    },
    ...mapMutations(['SET_CURRENT_PAGE']),
    ...mapActions(['getTasks'])
  },
  watch: {
    currentPage() {
      this.getTasks()
    }
  },
  mounted() {
    this.getTasks()
  }
}
</script>
