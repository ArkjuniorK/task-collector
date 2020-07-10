<template>
  <div
    id="login"
    class="flex flex-col justify-center mx-5 text-center md:h-screen-80 xl:h-auto xxl:mt-24"
  >
    <div
      v-if="res"
      class="flex flex-row w-11/12 p-2 mx-auto mb-6 leading-tight text-left rounded res transition duration-500 bg-red text-dark-100 md:w-1/2 lg:w-1/3"
      :class="resTransition"
    >
      <div class="w-6 px-1 icon">
        <svg
          class="w-full h-full fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 5h2v6H9V5zm0 8h2v2H9v-2z"
          />
        </svg>
      </div>
      <span class="w-11/12 ml-2 text-sm font-light font-display lg:text-base">
        {{ res }}
      </span>
    </div>
    <login-svg></login-svg>
    <div class="w-full title-form">
      <div class="mt-6 child lg:w-2/3 lg:mx-auto lg:align-top xl:flex xl:mt-8">
        <div class="title xl:text-right xl:w-full xl:mr-4">
          <span
            class="text-lg font-bold font-display md:text-xl lg:text-4xl lg:w-2/6 xxl:text-5xl"
            >Lihat, Atur dan <br v-if="textBreak" />
            Kerjakan Tugasmu <br v-if="textBreak" />
            Dengan Mudah</span
          >
        </div>
        <div class="mt-4 form md:mx-40 xl:m-0 xl:text-left xl:w-full xl:ml-4">
          <span class="font-display xl:text-xl">Masuk ke Akun Anda</span>
          <form
            @submit.prevent="login"
            autocomplete="off"
            class="m-4 font-display lg:m-0 lg:w-2/3 lg:mt-4 xl:text-xl xl:w-3/5 xxl:w-1/2"
          >
            <input
              type="number"
              class="w-full p-3 rounded appearance-none bg-light-200 focus:outline-none"
              placeholder="Nomor Induk Pengguna"
              v-model.number="user.id"
            />
            <input
              type="password"
              class="w-full p-3 mt-4 rounded appearance-none bg-light-200 focus:outline-none"
              placeholder="Kunci Keamanan"
              v-model="user.key"
            />

            <div
              id="register-as"
              class="block p-4 my-4 text-left border rounded xl:items-center xl:flex xl:justify-between font-display border-light-300"
            >
              <div class="text-lg font-bold title">Masuk Sebagai</div>
              <div class="mt-3 list xl:flex xl:items-center xl:mt-0">
                <label
                  class="relative block pl-8 mb-3 text-base cursor-pointer select-none xl:mr-3 xl:mb-0 label"
                  >Siswa
                  <input
                    type="radio"
                    checked="checked"
                    name="radio"
                    value="Siswa"
                    v-model="loginAs"
                  />
                  <span
                    class="absolute top-0 left-0 w-5 h-5 border rounded-full checkmark hover:bg-light-300 transition duration-200 border-light-300"
                  ></span>
                </label>
                <label
                  class="relative block pl-8 text-base cursor-pointer select-none label"
                  >Guru
                  <input
                    type="radio"
                    name="radio"
                    value="Guru"
                    v-model="loginAs"
                  />
                  <span
                    class="absolute top-0 left-0 w-5 h-5 border rounded-full checkmark border-light-300 hover:bg-light-300 transition duration-200"
                  ></span>
                </label>
              </div>
            </div>

            <div class="block mt-10 btn-action lg:flex lg:items-center">
              <my-btn
                type="button"
                name="Reset"
                btnClass="bg-light-100 p-2 hover:bg-light-200"
                @clicked="reset"
              ></my-btn>
              <my-btn
                type="button"
                name="Masuk"
                btnClass="bg-blue p-2 hover:bg-light-200 mt-3 lg:mt-0 lg:ml-2"
                @clicked="login"
              >
                <template v-slot:icon>
                  <svg
                    class="w-4 ml-2 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <polygon
                      points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"
                    />
                  </svg>
                </template>
              </my-btn>
            </div>
            <div id="link" class="mt-5">
              <router-link to="/register" class="text-sm border-b font-display"
                >Tidak Punya Akun? Silahkan Daftar</router-link
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '../services/AuthServices'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    user: {
      id: null,
      key: null
    },
    loginAs: null,
    res: null
  }),
  components: {
    loginSvg: () => import('../components/illustration/LoginSvg'),
    myBtn: () => import('../components/complements/Button')
  },
  computed: {
    textBreak() {
      return this.$mq == 'xxl' ? true : this.$mq == 'xl' ? true : false
    },
    resTransition() {
      return this.res ? '' : ''
    }
  },
  methods: {
    async login() {
      try {
        if (this.loginAs === 'Guru') await this.loginTeacher(this.user)
        if (this.loginAs === 'Siswa') await this.loginStudent(this.user)

        this.user = {
          id: await null,
          key: await null
        }

        this.$router.push({ path: '/' })
      } catch (err) {
        this.res = err.response.data.error
      }
    },
    reset() {
      this.user = {
        id: null,
        key: null
      }
    },
    ...mapActions(['loginTeacher', 'loginStudent'])
  }
}
</script>

<style>
.animate {
  transition: ease-in-out;
  animation: slideIn;
  animation-duration: 500;
}

@keyframes slideIn {
  from {
    transform: translateX(-30px);
  }
  to {
    transform: translateX(0);
  }
}

.label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}
.label input:checked ~ .checkmark {
  background-color: #2196f3;
}
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}
.label input:checked ~ .checkmark:after {
  display: block;
}
.label .checkmark:after {
  top: 0.25rem;
  left: 0.25rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: white;
}
</style>
