<template>
  <div id="view-theme" class="w-full">
    <main-section
      sub-class="mx-5 h-full md:mx-32 lg:mx-48 xl:mx-10 xxl:mx-16 xxxl:mx-64"
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
          <span class="text-base font-display">{{ info.name }}</span>
        </div>
      </template>
      <template v-slot:content>
        <div
          class="w-full xl:mt-10 xl:max-w-screen-md xxl:max-w-screen-lg xl:mx-auto"
        >
          <div
            class="theme-card rounded-lg p-5 text-left block text-dark-100 mb-5 xxl:p-8 xl:mb-8 bg-opacity-50"
            :class="info.background"
          >
            <span class="font-display block text-sm lg:text-base xxl:text-lg">
              {{ info.name }}
            </span>
            <span class="text-xl block font-bold mt-1 lg:text-3xl xxl:text-4xl">
              {{ info.title }}
            </span>
          </div>
          <div
            v-if="info.subthemes == undefined || info.subthemes.length == 0"
            id="no-theme"
            class="flex flex-col items-center justify-around h-screen-50"
          >
            <div class="flex flex-col items-center">
              <sad-emot />
              <span class="my-3 text-sm font-display">Tidak Ada Subtema</span>
            </div>
          </div>
          <div
            v-else
            class="task-grid grid grid-cols-2 gap-3 xl:grid-cols-3 xl:gap-6 xxxl:gap-6"
          >
            <data-card
              v-for="(subtheme, index) in info.subthemes"
              :key="index"
              :title="subtheme.title"
              :subject="subtheme.name"
              :task="subtheme.tasks.length"
              :class="[subtheme.background, 'xl:rounded-lg']"
              @cardClicked="gotoSubtheme(subtheme.id)"
              @btnClicked="gotoSubtheme(subtheme.id)"
            />
          </div>
        </div>
      </template>
    </main-section>
    <my-options
      v-if="userType === 'teacher'"
      @edit="editTheme"
      @delete="popup = !popup"
    />
    <pop-up v-show="popup">
      <div v-show="dlte" id="delete" slot="one">
        <div class="p-4 text-dark-200">
          <span class="font-bold text-lg block mb-2"
            >Yakin Ingin Menghapus Tema Ini?</span
          >
          <span class="block mb-1 text-sm"
            >Tindakan Ini Tidak Dapat Dikembalikan</span
          >
        </div>
        <ul class=" grid grid-cols-2 gap-2 p-3">
          <li>
            <my-btn
              class="p-2 bg-blue-task rounded h-full"
              @clicked="deleteTheme(info.id)"
            >
              <span v-if="load == false">
                Ya
              </span>
              <div v-else slot="icon">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-circle-half rotate h-auto"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 15V1a7 7 0 1 1 0 14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
                  />
                </svg>
              </div>
            </my-btn>
          </li>
          <li>
            <my-btn
              class="p-2 bg-red-task rounded"
              :btn-disabled="load"
              @clicked="popup = false"
            >
              Tidak
            </my-btn>
          </li>
        </ul>
      </div>
      <div v-show="success" slot="two" class="flex p-2 items-center">
        <task-view class="svg-view" />
        <div class="text ml-3 text-left text-dark-200">
          <span class="block font-display mb-1">Horee...</span>
          <span class="block font-bold"> {{ response.success }} !</span>
        </div>
      </div>
      <div v-show="error" slot="three" class="flex p-2 items-center">
        <student-svg class="svg-view" />
        <div class="text ml-3 text-left text-dark-200">
          <span class="block font-display mb-1">Uppss..</span>
          <span class="block font-bold"> {{ response.error }} </span>
        </div>
      </div>
    </pop-up>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'ViewTheme',
  components: {
    mainSection: () => import('@/components/MainSection'),
    myBtn: () => import('@/components/complements/Button'),
    dataCard: () => import('@/components/complements/TaskCard'),
    sadEmot: () => import('@/components/illustration/SadEmot'),
    myOptions: () => import('@/components/Options'),
    popUp: () => import('@/components/Popup'),
    studentSvg: () => import('@/components/illustration/StudentsSvg'),
    taskView: () => import('@/components/illustration/TaskView')
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
      default: null
    }
  },
  data: () => ({
    popup: false,
    dlte: true,
    load: false,
    success: false,
    error: false
  }),
  computed: {
    ...mapState({
      info: state => state.theme.info,
      userType: state => state.userType,
      response: state => state.response
    })
  },
  mounted() {
    this['theme/getTheme'](this.id)
  },
  methods: {
    gotoSubtheme(id) {
      this.$router.push({ name: 'viewSubtheme', params: { id: id } })
    },
    editTheme() {
      setTimeout(() => {
        this.$router.push({ name: 'Home' })
        this.SET_RESPONSE(null)
      }, 3000)
    },
    deleteTheme(id) {
      // start deleting theme
      this.load = true
      this['theme/deleteTheme'](id)

      // after 3s
      setTimeout(() => {
        this.load = false
        this.dlte = false

        if (this.response.success) this.success = true
        else if (this.response.error) this.error = true
        else this.popUp = false
      }, 3000)

      // after 6s
      setTimeout(() => {
        if (this.success) this.$router.push({ name: 'Home' })
        else this.popup = false

        this.SET_RESPONSE(null)
      }, 6000)
    },
    ...mapMutations(['SET_RESPONSE']),
    ...mapActions(['theme/getTheme', 'theme/deleteTheme'])
  }
}
</script>

<style scoped>
.rotate {
  transition: transform 1s ease-in-out;
  animation: rotate 1s infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
