<template>
  <div id="view-task" class="w-full">
    <main-section
      subClass="mx-5 h-full md:mx-32 lg:mx-48 xl:mx-10 xxl:mx-16 xxxl:mx-64"
    >
      <template v-slot:left-one>
        <div class="btn">
          <my-btn
            @clicked="$router.back()"
            btnClass="flex-row-reverse p-2 focus:bg-light-200"
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
          <span class="text-base font-display">Kerjakan Tugas</span>
        </div>
      </template>
      <template v-slot:content>
        <div class="w-full content-task xl:flex xl:mt-10">
          <div class="flex items-start svg-content">
            <task-view></task-view>
            <div class="flex flex-col w-full ml-3 text-left md:ml-6 xl:hidden">
              <span class="text-sm font-light md:text-base">
                {{ task.subjectName }}</span
              >
              <span class="mt-1 text-xl font-bold md:text-2xl">{{
                task.name
              }}</span>
            </div>
          </div>
          <div
            id="question-task"
            class="mt-10 xl:flex xl:items-start xl:mt-0 xl:ml-10"
          >
            <div id="question-help" class="text-left xl:w-1/2 xl:mr-20">
              <div id="question-title" class="hidden mb-10 xl:flex xl:flex-col">
                <span class="font-sans text-lg font-normal">{{
                  task.subjectName
                }}</span
                ><span class="mt-1 font-sans text-3xl font-black">{{
                  task.name
                }}</span>
              </div>
              <div id="question">
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
                  <span>Jawablah pertanyaan di bawah ini</span>
                </div>
                <div
                  id="question-list"
                  class="mt-4 font-sans text-base font-bold md:text-lg"
                >
                  <div
                    v-for="(question, index) in task.questions"
                    :key="index"
                    id="question-list-child"
                    class="flex items-start leading-normal"
                  >
                    <div id="num" class="mr-2">
                      <span>{{ index + 1 }}</span>
                    </div>
                    <div id="content">
                      <span>{{ question }}</span>
                    </div>
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
                        d="M20 14v4a2 2 0 0 1-2 2h-4v-2a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2H6a2 2 0 0 1-2-2v-4H2a2 2 0 0 1-2-2 2 2 0 0 1 2-2h2V6c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2 2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v4h-2a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2z"
                      />
                    </svg>
                  </div>
                  <span>Bantuan</span>
                </div>
                <div
                  id="help-list"
                  class="mt-4 font-sans text-base font-bold md:text-lg"
                >
                  <div
                    v-for="(reference, index) in task.references"
                    :key="index"
                    id="help-list-child"
                    class="flex items-start leading-normal"
                  >
                    <div id="num">
                      <span class="mr-2">{{ index + 1 }}</span>
                    </div>
                    <div id="content">
                      <span>{{ reference }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="tips" class="mt-8 xl:mt-0 xl:w-2/5">
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
                <span>Tips Menjawab Tugas</span>
              </div>
              <div
                id="tips-list"
                class="mt-4 font-sans text-base font-bold leading-normal text-left md:text-lg xl:w-4/6"
              >
                <span>Jawablah soal paling mudah terlebih dahulu</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </main-section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ViewTask',
  components: {
    mainSection: () => import('../components/MainSection'),
    myBtn: () => import('../components/complements/Button'),
    taskView: () => import('../components/illustration/TaskView')
  },
  computed: {
    ...mapState(['task'])
  }
}
</script>
