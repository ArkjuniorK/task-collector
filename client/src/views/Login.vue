<template>
  <div
    id="login"
    class="text-center flex flex-col justify-center mx-5 md:h-screen-80 xl:h-auto xxl:mt-24"
  >
    <div
      v-if="res"
      class="res transition duration-500 mb-6 mx-auto bg-red p-2 rounded flex flex-row text-dark-100 text-left w-11/12 leading-tight md:w-1/2 lg:w-1/3"
      :class="resTransition"
    >
      <div class="icon w-6 px-1">
        <svg
          class="fill-current w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 5h2v6H9V5zm0 8h2v2H9v-2z"
          />
        </svg>
      </div>
      <span class="font-display font-light text-sm w-11/12 ml-2 lg:text-base">
        {{ res }}
      </span>
    </div>
    <login-svg></login-svg>
    <div class="title-form w-full">
      <div class="child mt-6 lg:w-2/3 lg:mx-auto lg:align-top xl:flex xl:mt-8">
        <div class="title xl:text-right xl:w-full xl:mr-4">
          <span
            class="font-bold font-display text-lg md:text-xl lg:text-4xl lg:w-2/6 xxl:text-5xl"
            >Lihat, Atur dan <br v-if="textBreak" />
            Kerjakan Tugasmu <br v-if="textBreak" />
            Dengan Mudah</span
          >
        </div>
        <div class="form mt-4 md:mx-40 xl:m-0 xl:text-left xl:w-full xl:ml-4">
          <span class="font-display xl:text-xl">Masuk ke Akun Anda</span>
          <form
            @submit.prevent="login"
            autocomplete="off"
            class="m-4 font-display lg:m-0 lg:w-2/3 lg:mt-4 xl:text-xl xl:w-3/5 xxl:w-1/2"
          >
            <input
              type="number"
              class="p-3 bg-light-200 rounded focus:outline-none appearance-none w-full"
              placeholder="Nomor Induk Pengguna"
              v-model.number="user.id"
            />
            <input
              type="password"
              class="p-3 bg-light-200 rounded focus:outline-none appearance-none mt-4 w-full"
              placeholder="Kunci Keamanan"
              v-model="user.key"
            />

            <div class="btn-action mt-10 block lg:flex lg:items-center">
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
                    class="fill-current w-4 ml-2"
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
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '../services/AuthServices'

export default {
  name: 'Login',
  data: () => ({
    user: {
      id: null,
      key: null
    },
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
        await this.$store.dispatch('loginTeacher', this.user)
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
    }
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
</style>
