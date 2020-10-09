<template>
  <div id="view-task" class="w-full">
    <main-section
      sub-class="mx-5 h-full md:mx-32 lg:mx-48 xl:mx-10 xxl:mx-16 xxxl:mx-64"
    >
      <template v-slot:left-one>
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
      </template>
      <template v-slot:right-one>
        <span class="text-base font-display">Kerjakan Tugas</span>
      </template>
      <template v-slot:content>
        <div
          class="w-full container xl:mt-10 xl:max-w-screen-md xxl:max-w-screen-lg xl:mx-auto"
        >
          <div
            class="rounded-lg p-5 text-left block text-dark-100 mb-5 xxl:p-8 xl:mb-8 bg-opacity-50"
            :class="info.background"
          >
            <span class="font-display block text-sm lg:text-base xxl:text-lg">{{
              info.subjectName
            }}</span>
            <span
              class="text-xl block font-bold mt-1 lg:text-3xl xxl:text-4xl"
              >{{ info.name }}</span
            >
          </div>
          <div
            id="slider"
            class="overflow-auto whitespace-no-wrap flex pb-3 -mx-5 mb-4"
          >
            <div
              id="theme"
              :class="theme.background"
              class="rounded w-auto p-2 mr-3"
            >
              <span class="font-bold mr-2">
                {{ theme.name }}
              </span>
              <span class="font-display">
                {{ theme.title }}
              </span>
            </div>
            <div
              id="subtheme"
              :class="subtheme.background"
              class="rounded w-auto p-2"
            >
              <span class="font-bold mr-2">
                {{ subtheme.name }}
              </span>
              <span class="font-display">
                {{ subtheme.title }}
              </span>
            </div>
          </div>
          <div class="flex flex-col xl:flex-row-reverse items-start">
            <div class="right xl:ml-5 ">
              <div
                class="text-left mb-5 xl:border xl:border-opacity-50 xl:border-dark-200 xl:rounded"
              >
                <div class="title text-sm px-2 xl:text-lg xl:p-3">
                  <div class="icon-title flex items-center mb-2 text-dark-200 ">
                    <div class="icon mr-2 ">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        class="bi bi-heart-fill fill-current"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                        />
                      </svg>
                    </div>
                    <span class="font-display">Tips Menjawab Tugas</span>
                  </div>
                  <span class="font-bold"
                    >Jawablah Pertanyaan Yang Paling Mudah</span
                  >
                </div>
              </div>
            </div>
            <div class="left w-full">
              <div class="text-left mb-5">
                <div
                  class="questions-box rounded-md border border-dark-300 overflow-hidden"
                >
                  <div
                    class="top bg-light-200 flex p-2 text-sm items-center lg:text-lg"
                  >
                    <div class="icon mr-2">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        class="bi bi-patch-question-fll fill-current"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.933.87a2.89 2.89 0 0 1 4.134 0l.622.638.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636zM7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm1.602-2.027c-.05.386-.218.627-.554.627-.377 0-.585-.317-.585-.745v-.11c0-.727.307-1.208.926-1.641.614-.44.822-.762.822-1.325 0-.638-.42-1.084-1.03-1.084-.55 0-.916.323-1.074.914-.109.364-.292.51-.564.51C6.203 6.12 6 5.873 6 5.48c0-.251.045-.468.139-.69.307-.798 1.079-1.29 2.099-1.29 1.341 0 2.262.902 2.262 2.227 0 .896-.376 1.511-1.05 1.986-.648.445-.806.726-.846 1.26z"
                        />
                      </svg>
                    </div>
                    <span class="font-display">Jawablah Pertanyaan Ini</span>
                  </div>
                  <div class="bottom p-3">
                    <div
                      v-for="(quest, index) in info.questions"
                      :key="index"
                      class="question flex font-display lg:text-xl"
                      :class="index > 0 ? 'mt-2' : ''"
                    >
                      <span class="mr-2"> {{ index + 1 }}. </span>
                      <span> {{ quest }} </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-left mb-5">
                <div
                  class="help-box rounded-md border border-dark-300 overflow-hidden"
                >
                  <div
                    class="top bg-light-200 flex p-2 text-sm items-center lg:text-lg"
                  >
                    <div class="icon mr-2">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        class="bi bi-check-square-fill fill-current"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                        />
                      </svg>
                    </div>
                    <span class="font-display">Bantuan</span>
                  </div>
                  <div class="bottom p-3">
                    <div
                      v-for="(reference, index) in info.references"
                      :key="index"
                      class="question flex font-display lg:text-xl"
                      :class="index > 0 ? 'mt-2' : ''"
                    >
                      <span class="mr-2"> {{ index + 1 }}. </span>
                      <span> {{ reference }} </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </main-section>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('task')

export default {
  name: 'ViewTask',
  components: {
    mainSection: () => import('../components/MainSection'),
    myBtn: () => import('../components/complements/Button')
  },
  props: ['id'],
  data: () => ({
    theme: {},
    subtheme: {}
  }),
  computed: {
    ...mapState(['info'])
  },
  watch: {
    info() {
      this.theme = this.info.subtheme.theme
      this.subtheme = this.info.subtheme
    }
  },
  mounted() {
    this.getTask(this.id)
  },
  methods: {
    ...mapActions(['getTask'])
  }
}
</script>

<style>
#slider::before,
#slider::after {
  content: '';
  padding: 0.6rem;
}
</style>
