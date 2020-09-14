<template>
  <div id="task-card" :class="[recentClass, closeRecents]">
    <div class="flex justify-between">
      <div id="title" class="flex text-dark-400">
        <div class="w-4 mr-2 icon">
          <svg
            class="w-full h-full fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.59V4h2v5.59l3.95 3.95-1.41 1.41L9 10.41z"
            />
          </svg>
        </div>
        <div class="title">
          <span class="text-sm font-display lg:text-base xxl:text-lg">Tugas Terbaru</span>
        </div>
      </div>
      <button
        type="button"
        @click="close"
        class="outline-none focus:outline-none text-dark-200 rounded-full px-1"
      >
        <svg class="w-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path
            d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
          />
        </svg>
      </button>
    </div>
    <div class="h-full mt-2 body grid grid-cols-1 xl:grid-cols-3">
      <div
        class="flex text-left one text-dark-400 xl:flex-row-reverse xl:col-span-1 xl:items-start"
      >
        <task-svg childClass="md:w-1/5 xl:w-1/2"></task-svg>
        <div class="py-2 ml-3 mr-3 text md:w-4/5 xl:w-1/2">
          <span
            class="items-start font-sans font-bold leading-tight sm:text-xl md:text-2xl xl:text-xl xxl:text-2xl xxxl:text-3xl"
          >{{ title }}</span>
        </div>
      </div>
      <div
        class="mt-4 two grid grid-cols-2 gap-3 xl:mt-0 xl:col-span-2 xl:ml-12 xl:gap-6 xxl:col-span-2"
      >
        <task-card
          v-for="task in recents"
          :key="task.id"
          :title="task.name"
          :subject="task.subjectName"
          :date="task.date"
          class="border bg-light-100 border-dark-400 border-opacity-25"
        ></task-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'
import moment from 'moment'

export default {
  name: 'TaskCard',
  components: {
    taskSvg: () => import('../components/illustration/TaskSvg'),
    taskCard: () => import('../components/complements/TaskCard')
  },
  props: {
    recentClass: String
  },
  data: () => ({
    title: 'Daftar Tugas Terbaru Yang Telah di Bagikan Kepada Siswa',
    closeRecents: ''
  }),
  computed: {
    ...mapState(['recents'])
  },
  methods: {
    close() {
      this.closeRecents = 'hidden'
    },
    ...mapActions(['getRecentTasks'])
  },
  async mounted() {
    this.getRecentTasks()
  }
}
</script>
