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
            <span class="font-display block text-sm lg:text-base xxl:text-lg">{{
              info.name
            }}</span>
            <span
              class="text-xl block font-bold mt-1 lg:text-3xl xxl:text-4xl"
              >{{ info.title }}</span
            >
          </div>
          <div
            v-if="info.subthemes == undefined || info.subthemes.length == 0"
            id="no-theme"
            class="flex flex-col items-center justify-around h-screen-50"
          >
            <div class="flex flex-col items-center">
              <sad-emot></sad-emot>
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
            ></data-card>
          </div>
        </div>
      </template>
    </main-section>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('theme')

export default {
  name: 'ViewTheme',
  components: {
    mainSection: () => import('../components/MainSection'),
    myBtn: () => import('../components/complements/Button'),
    dataCard: () => import('../components/complements/TaskCard'),
    sadEmot: () => import('../components/illustration/SadEmot')
  },
  props: {
    id: {
      type: Number,
      required: true,
      default: null
    }
  },
  computed: {
    ...mapState(['info'])
  },
  mounted() {
    this.getTheme(this.id)
  },
  methods: {
    gotoSubtheme(e) {
      this.$router.push({ name: 'viewSubtheme', params: { id: e } })
    },
    ...mapActions(['getTheme'])
  }
}
</script>
