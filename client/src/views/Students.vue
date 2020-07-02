<template>
  <div id="students" class="w-full">
    <div class="students-child">
      <main-section
        mainClass="mx-5 h-full md:mx-32 lg:mx-48 xl:mx-10 xxl:mx-16 xxxl:mx-64"
      >
        <template v-slot:left-one>
          <div class="flex items-center upper-left text-dark-200">
            <div class="w-4 mr-3 icon">
              <svg
                class="w-full h-full fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z"
                />
              </svg>
            </div>
            <div class="title">
              <span class="text-sm font-display lg:text-base xxl:text-lg"
                >Daftar Siswa</span
              >
            </div>
          </div>
        </template>
        <template v-slot:right-one>
          <search-input
            v-if="$mq == 'xl'"
            placeholder="Cari Siswa atau Nomor Induk"
            routeName="Students"
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
        </template>
        <template v-slot:first-two>
          <search-input
            placeholder="Cari Siswa atau Nomor Induk"
            routeName="Students"
            srClass="xl:hidden"
            @seacrh="search"
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
        </template>
        <template v-slot:content>
          <div class="w-full xl:flex xl:items-start">
            <div class="flex items-center text-left one xl:w-1/6">
              <students-svg></students-svg>
              <div
                class="flex flex-col py-2 ml-3 mr-3 font-sans font-bold text sm:text-xl md:text-2xl xl:text-xl xxl:text-2xl xxxl:text-3xl md:w-4/5 xl:w-1/2 xl:hidden"
              >
                <span>Daftar Siswa Kelas {{ teacher.class[0].idNumber }}</span>
                <span> {{ teacher.school.name }}</span>
              </div>
            </div>
            <div class="w-full mt-4 two xl:w-5/6 xl:ml-12">
              <div
                class="hidden font-sans text-2xl font-bold text-left xl:flex xl:flex-col"
              >
                <span>Daftar Siswa Kelas {{ teacher.class[0].idNumber }} </span>
                <span> {{ teacher.school.name }} </span>
              </div>
              <div id="table-parent" class="relative mt-10 xs:hidden xl:block">
                <table class="w-full table-auto">
                  <thead>
                    <tr class="text-lg text-left border-b border-light-300">
                      <th class="p-2">Nomor Induk</th>
                      <th class="p-2">Nama Siswa</th>
                      <th class="p-2">Jenis Kelamin</th>
                      <th class="p-2">Alamat</th>
                      <th class="p-2">TTL</th>
                    </tr>
                  </thead>
                  <tbody class="mt-2">
                    <tr
                      v-for="(student, index) in students"
                      :key="index"
                      class="p-2 overflow-hidden text-left rounded-full"
                    >
                      <th class="p-3">{{ student.idNumber }}</th>
                      <th class="p-3">{{ student.name }}</th>
                      <th class="p-3">{{ student.gender }}</th>
                      <th class="p-3">{{ student.address }}</th>
                      <th class="p-3">{{ student.born }}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="card-parent" class="relative xl:hidden">
                <student-card
                  v-for="(student, index) in students"
                  :key="index"
                  :id="student.idNumber"
                  :name="student.name"
                  :gender="student.gender"
                  :address="student.address"
                  :birth="student.birth"
                ></student-card>
              </div>
            </div>
          </div>
        </template>
      </main-section>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'

// @ is an alias to /src
export default {
  name: 'Students',
  components: {
    mainSection: () => import('../components/MainSection'),
    searchInput: () => import('../components/complements/Search'),
    studentsSvg: () => import('../components/illustration/StudentsSvg'),
    studentCard: () => import('../components/complements/StudentCard')
  },
  data: () => ({}),
  computed: {
    students() {
      let studentsArr = this.teacher.students
      let search = this.route.query.search

      if (!search) {
        return studentsArr
      }

      let searchString = search.trim().toLowerCase()

      studentsArr = studentsArr.filter(item => {
        if (item.name.toLowerCase().indexOf(search) !== -1) return item
      })

      return studentsArr
    },
    ...mapState(['teacher', 'route'])
  },
  methods: {
    search(val) {
      console.log(val)
    }
  },
  mounted() {
    console.log('from students', this.students)
    console.log('from teacher', this.teacher.students)
  },
  watch: {}
}
</script>

<style>
tbody tr:nth-child(even) {
  background-color: #b7cfff;
}
</style>
