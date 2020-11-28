<template>
  <div id="view-task" class="w-full">
    <main-section
      sub-class="mx-4 h-full md:mx-32 lg:mx-48 xl:mx-10 xxl:mx-16 xxxl:mx-64"
    >
      <template v-slot:left-one>
        <div class="btn">
          <my-btn
            btn-class="flex-row-reverse p-2 focus:bg-light-200"
            @clicked="$router.back()"
          >
            Kembali
            <template v-slot:icon>
              <div class="w-3 mr-2 icon">
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <polygon
                    points="3.828 9 9.899 2.929 8.485 1.515 0 10 .707 10.707 8.485 18.485 9.899 17.071 3.828 11 20 11 20 9 3.828 9"
                  />
                </svg>
              </div>
            </template>
          </my-btn>
        </div>
      </template>
      <template v-slot:right-one>
        <div class="text-right title-page">
          <span class="text-base font-display">Tugas Baru</span>
        </div>
      </template>
      <template v-slot:content>
        <div class="w-full content-task xl:flex xl:mt-10">
          <div class="flex items-start svg-content">
            <task-create></task-create>
            <div class="flex flex-col w-full ml-3 text-left md:ml-6 xl:hidden">
              <span class="text-sm font-light md:text-base"
                >Buat Tugas Baru</span
              >
              <span class="mt-1 text-xl font-bold md:text-2xl">
                Buat Tugas dan Bagikan Kepada Siswa
              </span>
            </div>
          </div>
          <div
            id="question-task"
            class="mt-10 xl:flex xl:items-start xl:mt-0 xl:ml-10"
          >
            <div id="question-help" class="text-left xl:w-1/2 xl:mr-20">
              <form
                id="add-task"
                class="mx-2 xl:mx-0"
                @submit.prevent="createTask"
              >
                <div id="subject-title">
                  <div
                    id="title"
                    class="flex items-center text-sm font-display md:text-base xl:hidden"
                  >
                    <div id="icon" class="w-4 mr-2">
                      <svg
                        class="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M3 6c0-1.1.9-2 2-2h8l4-4h2v16h-2l-4-4H5a2 2 0 0 1-2-2H1V6h2zm8 9v5H8l-1.67-5H5v-2h8v2h-2z"
                        />
                      </svg>
                    </div>
                    <span>Mata Pelajaran dan Judul Tugas</span>
                  </div>
                  <div
                    id="subject-input"
                    class="flex flex-col mt-6 text-left xl:mt-0 xl:w-1/2"
                  >
                    <div class="relative">
                      <input-text
                        v-model="subject"
                        input="true"
                        placeholder="Mata Pelajaran.."
                        @clicked="dropdown = !dropdown"
                      >
                        <template v-slot:icon>
                          <button
                            type="button"
                            class="p-1 rounded-full focus:outline-none"
                            @click="dropdown = !dropdown"
                          >
                            <div class="w-4 icon">
                              <svg
                                class="w-full h-full fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                />
                              </svg>
                            </div>
                          </button>
                        </template>
                      </input-text>
                      <div
                        v-if="dropdown"
                        id="select-option"
                        class="absolute flex flex-col w-full px-4 py-2 mt-2 rounded shadow-sm bg-light-200"
                      >
                        <span
                          v-for="(subject, index) in subjects"
                          :key="index"
                          class="p-2 cursor-pointer hover:text-dark-300 transition duration-200"
                          @click="select(subject)"
                          >{{ subject }}</span
                        >
                      </div>
                    </div>
                  </div>
                  <div id="title-input" class="mt-4">
                    <input-text
                      v-model="name"
                      textarea="true"
                      txt-class="font-black text-lg xl:text-3xl"
                      class="font-black"
                      placeholder="Judul Tugas.."
                    ></input-text>
                  </div>
                </div>
                <div id="questions" class="mt-8">
                  <div
                    id="title"
                    class="flex items-center text-sm font-display md:text-base"
                  >
                    <div id="icon" class="w-4 mr-2">
                      <svg
                        class="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M20 14v4a2 2 0 0 1-2 2h-4v-2a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2H6a2 2 0 0 1-2-2v-4H2a2 2 0 0 1-2-2 2 2 0 0 1 2-2h2V6c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2 2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v4h-2a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2z"
                        />
                      </svg>
                    </div>
                    <span>Soal dan Pertanyaan</span>
                  </div>
                  <div id="help-input" class="mt-6">
                    <input-text
                      v-for="(field, index) in questions"
                      :key="index"
                      v-model="field.question"
                      par-class="mb-4"
                      in-class="text-base w-full xl:text-lg"
                      input="true"
                      placeholder="Pertanyaan.."
                    ></input-text>
                    <div id="btn-add-input" class="mt-4">
                      <my-btn
                        btn-type="button"
                        btn-class="p-2 text-dark-300"
                        @clicked="addQuest"
                        >Tambah Pertanyaan
                        <template v-slot:icon>
                          <div class="w-4 ml-2 icon">
                            <svg
                              class="fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path
                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                              />
                            </svg>
                          </div>
                        </template>
                      </my-btn>
                    </div>
                  </div>
                </div>
                <div id="help" class="mt-8">
                  <div
                    id="title"
                    class="flex items-center text-sm font-display md:text-base"
                  >
                    <div id="icon" class="w-4 mr-2">
                      <svg
                        class="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm2-13c0 .28-.21.8-.42 1L10 9.58c-.57.58-1 1.6-1 2.42v1h2v-1c0-.29.21-.8.42-1L13 9.42c.57-.58 1-1.6 1-2.42a4 4 0 1 0-8 0h2a2 2 0 1 1 4 0zm-3 8v2h2v-2H9z"
                        />
                      </svg>
                    </div>
                    <span>Bantuan dan Petunjuk</span>
                  </div>
                  <div id="help-input" class="mt-6">
                    <input-text
                      v-for="(field, index) in references"
                      :key="index"
                      v-model="field.reference"
                      par-class="mb-4"
                      in-class="text-base w-full xl:text-lg"
                      input="true"
                      placeholder="Petunjuk.."
                    ></input-text>
                    <div id="btn-add-input" class="mt-4">
                      <my-btn
                        btn-type="button"
                        btn-class="p-2 text-dark-300"
                        @clicked="addReferences"
                        >Tambah Petunjuk
                        <template v-slot:icon>
                          <div class="w-4 ml-2 icon">
                            <svg
                              class="fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path
                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                              />
                            </svg>
                          </div>
                        </template>
                      </my-btn>
                    </div>
                  </div>
                </div>
                <div
                  id="action"
                  class="items-center mt-6 xl:flex xl:justify-between"
                >
                  <span class="text-sm"
                    >Tugas akan dibagikan kepada Kelas
                    <span class="font-bold">{{ teacherClass.idNumber }}</span>
                  </span>
                  <div id="btn" class="xl:flex xl:flex-row-reverse">
                    <my-btn
                      btn-type="submit"
                      btn-class="p-2 bg-blue mt-4 xl:mt-0 xl:ml-2 hover:bg-opacity-75 xl:text-lg"
                      >Bagikan Tugas</my-btn
                    >
                    <my-btn
                      btn-type="reset"
                      btn-class="p-2 text-dark-300 mt-4 xl:mt-0 hover:bg-light-200 xl:text-lg"
                      >Reset</my-btn
                    >
                  </div>
                </div>
              </form>
            </div>
            <div
              id="tips"
              class="p-6 mt-10 rounded-lg bg-red bg-opacity-50 xl:mt-0 xl:w-2/5 xl:p-0 xl:bg-opacity-0"
            >
              <div
                id="title"
                class="flex items-center text-sm font-display md:text-base"
              >
                <div id="icon" class="w-4 mr-2">
                  <svg
                    class="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z"
                    />
                  </svg>
                </div>
                <span>Tips Memberi Tugas</span>
              </div>
              <div
                id="tips-list"
                class="mt-4 font-sans text-base font-bold leading-normal text-left md:text-lg xl:w-4/6"
              >
                <span>Berikan bantuan dan petunjuk yang jelas</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </main-section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'CreateTask',
  components: {
    mainSection: () => import('@/components/MainSection'),
    myBtn: () => import('@/components/complements/Button'),
    taskCreate: () => import('@/components/illustration/TaskCreate'),
    inputText: () => import('@/components/complements/Input.vue')
  },
  data: () => ({
    dropdown: false,
    /* 
      to make the question form work with loop and have 
      their own instance, set questions data into array with
      each object represent as index

      ~_~
      but this... this truly a great idea 
    */
    questions: [{ question: '' }],
    references: [{ reference: '' }],
    name: null,
    subject: null
  }),
  computed: {
    bgSelector() {
      /* select the bg-color based on this.subject */
      return this.subject === 'Bahasa Indonesia'
        ? 'bg-light-200'
        : this.subject === 'Matematika'
        ? 'bg-red'
        : this.subject === 'Pendidikan Agama'
        ? 'bg-green'
        : this.subject === 'Seni Budaya'
        ? 'bg-orange'
        : this.subject === 'PKN'
        ? 'bg-yellow'
        : 'bg-blue'
    },
    ...mapState(['subjects', 'teacher']),
    ...mapGetters(['teacherClass'])
  },
  methods: {
    select(val) {
      this.subject = val
      this.dropdown = false
    },
    createTask() {
      let task = {
        background: this.bgSelector,
        subject: this.subject,
        name: this.name,
        questions: this.questions.map(field => field.question),
        references: this.references.map(field => field.reference),
        date: new Date()
      }

      this.postTask(task)
      this.$router.push('/')
    },
    addQuest() {
      /*  add question field into questions array */
      let question = { question: '' }
      this.questions.push(question)
    },
    addReferences() {
      /* add new reference field into references array  */
      let reference = { reference: '' }
      this.references.push(reference)
    },
    ...mapActions(['postTask'])
  }
}
</script>
