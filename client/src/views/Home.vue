<template>
  <div id="home" class="w-full">
    <div class="home-child">
      <recent-task
        recentClass="mx-5 md:mx-32 lg:mx-48 xl:mx-10 xxl:mx-16 xxxl:mx-64 mb-4 xl:mb-10"
      ></recent-task>
      <main-section
        mainClass="bg-light-100"
        subClass="mx-5 py-5 h-full md:mx-32 md:py-6 lg:mx-48 xl:mx-10 xxl:mx-16 xxxl:mx-64"
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
                >Daftar Tugas</span
              >
            </div>
          </div>
        </template>
        <template v-slot:right-one>
          <div class="upper-right">
            <div class="one">
              <my-btn
                btnClass="bg-light-200 p-2 text-dark-200 xl:hidden"
                @clicked="$router.push('/search')"
              >
                <template v-slot:icon>
                  <div class="w-4 icon">
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
              <search-input
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
              </search-input>
            </div>
            <div class="two"></div>
          </div>
        </template>
        <template v-slot:content>
          <div class="content">
            <div
              v-if="tasks.length === 0"
              class="flex flex-col justify-center no-task"
            >
              <empty-svg></empty-svg>
              <div class="mt-5 caption">
                <span class="text-sm font-display">Tidak Ada Tugas</span>
              </div>
            </div>
            <div
              v-if="tasks.length >= 1"
              class="task-grid grid grid-cols-2 gap-3 xl:grid-cols-3 xxl:grid-cols-4 xl:gap-6 xxxl:gap-6"
            >
              <task-card
                v-for="(task, index) in tasksList"
                :key="index"
                :title="task.title"
                :subject="task.subject"
                :date="task.date"
                :cardClass="[task.background, 'xl:rounded-lg']"
                @cardClicked="goToTask(task.index)"
              ></task-card>
            </div>
          </div>
        </template>
        <template v-slot:paginate>
          <scroll-pagination
            @load="addCurrentPage"
            :currentPage="currentPage"
            :totalPages="pagination.totalPages"
            :totalRecords="pagination.totalTasks"
            :totalTasks="tasks.length"
          ></scroll-pagination>
        </template>
      </main-section>
    </div>
  </div>
</template>
<script>
import teacherService from '../services/TeacherServices'
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'

// @ is an alias to /src
export default {
  name: 'Home',
  components: {
    recentTask: () => import('../components/RecentTask'),
    mainSection: () => import('../components/MainSection'),
    taskCard: () => import('../components/complements/TaskCard'),
    scrollPagination: () => import('../components/ScrollPagination'),
    myBtn: () => import('../components/complements/Button'),
    searchInput: () => import('../components/complements/Search'),
    emptySvg: () => import('../components/illustration/TasksEmptSvg')
  },
  data: () => ({
    tasksList: [],
    condition: false
  }),
  computed: {
    ...mapState(['teacher', 'student', 'tasks', 'pagination', 'currentPage'])
  },
  methods: {
    getTasks() {
      if (this.teacher.idNumber) {
        let payload = {
          idNumber: this.teacher.idNumber,
          page: this.currentPage
        }
        this.getTeacherTasks(payload)
      } else if (this.student.idNumber) {
        let payload = {
          idNumber: this.student.idNumber,
          page: this.currentPage
        }
        this.getStudentTasks(payload)
      } else {
      }
    },
    async goToTask(val) {
      /* make request to the server */
      this.getTask(val)

      /* push the ViewTask with the val as params */
      this.$router.push({
        name: 'ViewTask',
        params: {
          id: val
        }
      })
    },
    ...mapActions([
      'getTeacherTasks',
      'getStudentTasks',
      'addCurrentPage',
      'getTask',
      'refreshCurrentPage'
    ])
  },
  watch: {
    currentPage() {
      this.getTasks()
    },
    tasks() {
      return this.tasks.map(task => this.tasksList.push(task))
    }
  },
  async mounted() {
    /* 
			when the page is refreshed, it will trigger the created hook
			and run the function below async

			the 'refreshCurrentPage()' will reset the page to 1
			and then run the 'getTasks()' to get the list of task based on
			'this.currentPage'
		*/
    this.refreshCurrentPage()
    this.getTasks()
  }
}
</script>
