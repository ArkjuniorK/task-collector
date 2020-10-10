<template>
  <div id="create-subsubtheme">
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
        <span class="text-sm xl:text-base font-display">Tambah Subtema</span>
      </template>
      <template v-slot:content>
        <div class="w-full xl:mt-10 xl:max-w-screen-md xl:mx-auto">
          <div
            class="rounded-lg p-4 xl:p-6 flex items-center text-left xl:text-xl text-dark-100 mb-5 bg-orange-subtheme font-bold"
          >
            <div class="icon mr-2">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-suit-club-fill fill-current"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.5 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                <path
                  d="M8 9a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zm7 0a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"
                />
                <path
                  d="M5.602 14.153c.5-.758 1.224-1.98 1.83-3.498.187-.467.949-.467 1.136 0a19.816 19.816 0 0 0 1.83 3.498c.231.35-.02.847-.438.847H6.04c-.419 0-.67-.497-.438-.847z"
                />
                <path d="M7 7h2v4H7V7z" />
              </svg>
            </div>
            Tambahkan Subtema Baru
          </div>
          <div class="xl:flex xl:flex-row-reverse">
            <div id="tips" class=" xl:ml-3">
              <div
                class="text-left mb-5 xl:border xl:border-opacity-50 xl:border-dark-200 xl:rounded"
              >
                <div class="title text-sm px-2 xl:text-lg xl:p-3">
                  <div class="top flex justify-between">
                    <div
                      class="icon-title flex items-center mb-2 text-dark-200 "
                    >
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
                      <span class="font-display">Perhatian</span>
                    </div>
                  </div>
                  <span class="font-bold"
                    >Nama subtema akan menentukan warna dasar secara
                    otomatis.</span
                  >
                </div>
              </div>
            </div>
            <form class="xl:w-9/12" @submit.prevent="submitForm">
              <div class="input mb-auto col">
                <my-input
                  v-model="theme.name"
                  input="true"
                  placeholder="Nama Tema"
                  class="mb-3"
                  @clicked="selectThemes = !selectThemes"
                >
                  <template v-slot:icon>
                    <div class="w-4 cursor-pointer icon">
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
                  </template>
                </my-input>
                <my-input
                  v-model="form.name"
                  input="true"
                  placeholder="Nama Subtema"
                  class="mb-3"
                  @clicked="selectSubthemes = !selectSubthemes"
                >
                  <template v-slot:icon>
                    <div class="w-4 cursor-pointer icon">
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
                  </template>
                </my-input>
                <my-input
                  v-model="form.title"
                  textarea="true"
                  placeholder="Judul Subtema"
                ></my-input>
              </div>
              <div
                class="absolute bottom-0 w-full right-0 left-0 p-6 xl:relative xl:p-0 xl:mt-4"
              >
                <my-btn
                  class="bg-orange-subtheme p-2 xl:ml-auto"
                  type="submit"
                  :btn-disabled="disabled"
                  >Tambah Subtema</my-btn
                >
              </div>
            </form>
          </div>
        </div>
      </template>
    </main-section>
    <div
      v-if="selectThemes"
      id="theme-select"
      class="selection absolute z-20 w-full right-0 left-0 top-0 bottom-0 mx-auto flex items-center"
    >
      <div
        class="rounded bg-light-100 m-8 absolute z-50 right-0 left-0 overflow-y-scroll h-between"
      >
        <div
          class="flex justify-between align-middle p-3 border-b border-opacity-25 "
        >
          <span>Pilih Tema</span>
          <div class="h-auto">
            <my-btn type="button" @clicked="selectThemes = !selectThemes">
              <template v-slot:icon>
                <div class="icon">
                  <svg
                    width="1.2em"
                    height="1.2em"
                    viewBox="0 0 16 16"
                    class="bi bi-x fill-current w-full"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </div>
              </template>
            </my-btn>
          </div>
        </div>
        <div class="list-wrapper p-3">
          <div
            v-for="(v, index) in list"
            :key="index"
            class="list p-3 text-left flex"
          >
            <input
              :id="v.id"
              v-model="theme"
              type="radio"
              name="input"
              :value="v"
            />
            <label
              :for="v.id"
              class="ml-3 flex flex-col"
              @click="selectThemes = !selectThemes"
            >
              <span> {{ v.name }} </span>
              <span> {{ v.title }} </span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="selectSubthemes"
      id="subtheme-select"
      class="selection absolute z-20 w-full right-0 left-0 top-0 bottom-0 mx-auto flex items-center"
    >
      <div class="hello rounded bg-light-100 m-8 absolute z-50 right-0 left-0">
        <div
          class="flex justify-between align-middle p-3 border-b border-opacity-25"
        >
          <span>Pilih Subtema</span>
          <div class="h-auto">
            <my-btn type="button" @clicked="selectSubthemes = !selectSubthemes">
              <template v-slot:icon>
                <div class="icon">
                  <svg
                    width="1.2em"
                    height="1.2em"
                    viewBox="0 0 16 16"
                    class="bi bi-x fill-current w-full"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </div>
              </template>
            </my-btn>
          </div>
        </div>
        <div class="list-wrapper p-3">
          <div
            v-for="(v, index) in subthemes"
            :key="index"
            class="list p-3 text-left"
          >
            <input
              :id="v.name"
              v-model="form.name"
              type="radio"
              name="input"
              :value="v.name"
            />
            <label
              :for="v.name"
              class="ml-3"
              @click="selectSubthemes = !selectSubthemes"
            >
              {{ v.name }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  'subtheme'
)

export default {
  name: 'CreateSubtheme',
  components: {
    mainSection: () => import('../components/MainSection'),
    myBtn: () => import('../components/complements/Button'),
    myInput: () => import('../components/complements/Input')
  },
  data: () => ({
    selectThemes: false,
    selectSubthemes: false,
    disabled: true,
    subthemes: [
      { name: 'Subtema Satu', value: 'bg-blue-subtheme' },
      { name: 'Subtema Dua', value: 'bg-red-subtheme' },
      { name: 'Subtema Tiga', value: 'bg-orange-subtheme' },
      { name: 'Subtema Empat', value: 'bg-green-subtheme' },
      { name: 'Subtema Lima', value: 'bg-yellow-subtheme' },
      { name: 'Subtema Enam', value: 'bg-light-200' }
    ],
    theme: {},
    form: {
      name: '',
      title: ''
    }
  }),
  computed: {
    ...mapState(['list']),
    ...mapMutations(['RESET_DATA'])
  },
  watch: {
    selectThemes() {
      this.selectThemes === true ? this.listThemes() : null
    },
    form: {
      handler(val) {
        // turn object into array and filter the length of each value
        let validate = Object.values(this.form).filter(v => v.length >= 1)

        // when each array has qualify then
        // return this.disabled = false
        return validate.length > 1
          ? (this.disabled = false)
          : (this.disabled = true)
      },
      deep: true
    }
  },
  methods: {
    async submitForm(e) {
      // filter the names array if equal to this.form.name
      // and assign the value to this.form.bg
      let check = await this.subthemes.filter(
        val => this.form.name === val.name
      )
      this.form.background = check[0].value
      this.form.themeId = this.theme.id

      // postTheme actions and reset the data array
      await this.postSubtheme(this.form)
      await this.RESET_DATA
      this.$router.push('/')

      e.preventDefault()
    },
    ...mapActions(['postSubtheme', 'listThemes'])
  }
}
</script>

<style scoped>
.selection::before {
  content: '';
  position: absolute;
  background-color: black;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
}
</style>