<template>
  <div id="task-card" :class="recentClass">
    <div class="head text-dark-400 flex">
      <div class="icon w-4 mr-2">
        <svg
          class="fill-current w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.59V4h2v5.59l3.95 3.95-1.41 1.41L9 10.41z"
          />
        </svg>
      </div>
      <div class="title">
        <span class="font-display text-sm">Tugas Terbaru</span>
      </div>
    </div>
    <div class="body h-full mt-2 grid grid-cols-1 xl:grid-cols-3">
      <div
        class="one text-left text-dark-400 flex xl:flex-row-reverse xl:col-span-1 xl:items-start"
      >
        <task-svg childClass="md:w-1/5 xl:w-1/2"></task-svg>
        <div class="text ml-3 mr-3 py-2 md:w-4/5 xl:w-1/2">
          <span
            class="font-sans font-bold leading-tight items-start sm:text-xl md:text-2xl xl:text-xl xxl:text-2xl xxxl:text-3xl"
          >
            {{ title }}
          </span>
        </div>
      </div>
      <div
        class="two grid grid-cols-2 gap-3 mt-4 xl:mt-0 xl:col-span-2 xl:ml-12 xl:gap-6 xxl:col-span-2"
      >
        <task-card
          v-for="task in recents"
          :key="task.index"
          :title="task.title"
          :subject="task.subject"
          :date="task.date"
          @cardClicked="viewTask"
          cardClass="bg-light-100"
        ></task-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
    title: 'Daftar Tugas Terbaru Yang Telah di Bagikan Kepada Siswa'
  }),
  computed: {
    // recentTask() {
    //   /* use lodash orderBy then slice 2 latest task */
    //   return _.orderBy(this.tasks, 'index', 'asc').slice(0, 2)
    // },
    ...mapState(['recents'])
  },
  methods: {
    viewTask() {
      console.log('Hello From Recent')
    }
  },
  mounted() {
    console.log(this.recents)
  }
}
</script>
