<template>
  <div class="home w-full">
    <div class="home-child">
      <recent-task
        recentClass="mx-5 md:mx-32 lg:mx-48 xl:mx-10 xxl:mx-16 xxxl:mx-64"
      ></recent-task>
      <main-section
        mainClass="bg-light-100 mt-4 xl:mt-10"
        subClass="mx-5 py-5 h-full md:mx-32 md:py-6 lg:mx-48 xl:mx-10 xxl:mx-16 xxxl:mx-64"
      >
        <template v-slot:left-one>
          <div class="upper-left flex items-center text-dark-200">
            <div class="icon w-4 mr-3">
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
              <span class="font-display text-sm">Daftar Tugas</span>
            </div>
          </div>
        </template>
        <template v-slot:left-two>
          <div class="search flex items-center bg-light-200 p-3 rounded-md">
            <div class="icon w-4 mr-3 text-dark-300">
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
            <input
              type="text"
              class="w-full bg-light-200 text-display placeholder-dark-100"
              placeholder="Cari Tugas atau Mata Pelajaran..."
            />
          </div>
        </template>
        <template v-slot:content>
          <div class="content">
            <div
              class="task-grid grid grid-cols-2 gap-3 xl:grid-cols-3 xxl:grid-cols-4 xl:gap-6 xxxl:gap-6"
            >
              <task-card
                v-for="task in tasks"
                :key="task.index"
                :title="task.title"
                :subject="task.subject"
                :date="task.date"
                :cardClass="[task.background, 'xl:rounded-lg']"
              ></task-card>
            </div>
          </div>
        </template>
        <template v-slot:paginate>
          <pagination
            :totalPages="pagination.totalPages"
            :currentPage="currentPage"
            :total="pagination.totalRecords"
            @next="nextPage"
            @prev="prevPage"
            @page="btnPage"
          ></pagination>
        </template>
      </main-section>
    </div>
  </div>
</template>
<script>
import teacherService from '../services/TeacherServices'
import { mapState, mapActions } from 'vuex'

// @ is an alias to /src
export default {
  name: 'Home',
  components: {
    recentTask: () => import('../components/RecentTask'),
    mainSection: () => import('../components/MainSection'),
    taskCard: () => import('../components/complements/TaskCard'),
    pagination: () => import('../components/Pagination')
    // myBtn: () => import('../components/complements/Button')
  },
  data: () => ({
    currentPage: 1
  }),
  computed: {
    ...mapState(['teacher', 'tasks', 'pagination'])
  },
  methods: {
    prevPage() {
      this.currentPage--
    },
    nextPage() {
      this.currentPage++
    },
    btnPage(pageVal) {
      this.currentPage = pageVal
    },
    getTasks() {
      if (this.teacher.idNumber) {
        let payload = {
          idNumber: this.teacher.idNumber,
          page: this.currentPage
        }
        this.getTeacherTasks(payload)
      } else if (this.student.idNumber) {
      } else {
      }
    },
    ...mapActions(['getTeacherTasks'])
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

<style></style>
