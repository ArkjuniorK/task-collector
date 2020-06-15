<template>
  <div
    id="login"
    class="text-center md:mt-20 flex flex-col justify-center"
    :class="flexDirection"
  >
    <login-svg></login-svg>
    <div class="title-form w-full">
      <div class="child mt-6 lg:w-2/3 lg:mx-auto lg:align-top xl:flex xl:mt-8">
        <div class="title xl:text-right xl:w-full xl:mr-4">
          <span
            class="font-bold font-display text-lg md:text-xl lg:text-4xl lg:w-2/6"
            >Lihat, Atur dan <br v-if="textBreak" />
            Kerjakan Tugasmu <br v-if="textBreak" />
            Dengan Mudah</span
          >
        </div>
        <div class="form mt-4 md:mx-40 xl:m-0 xl:text-left xl:w-full xl:ml-4">
          <span class="font-display xl:text-xl">Masuk ke Akun Anda</span>
          <form
            class="m-4 font-display lg:m-0 lg:w-2/3 lg:mt-4 lg:w-full xl:text-xl xl:w-3/5 xxl:w-1/2"
          >
            <input
              type="text"
              class="p-3 bg-light-200 rounded focus:outline-none appearance-none w-full"
              placeholder="Nama Pengguna"
            />
            <input
              type="number"
              class="p-3 bg-light-200 rounded focus:outline-none appearance-none mt-4 w-full"
              placeholder="Nomor Induk"
            />

            <div class="btn-action mt-10 block lg:flex">
              <button
                class=" bg-light-100 p-2 font-display text-dark-200 rounded xs:w-full xs:mb-3 lg:mr-3 xl:text-lg lg:p-3 lg:w-full lg:mb-0 xl:w-auto  hover:bg-light-200"
              >
                Reset
              </button>
              <button
                class="bg-blue p-2 font-display rounded text-dark-100 flex items-center justify-center xs:w-full xl:text-lg lg:p-3 lg:w-full xl:w-auto"
              >
                Masuk
                <svg
                  class="fill-current w-4 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <polygon
                    points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    // textBreak: false
  }),
  components: {
    loginSvg: () => import('../components/illustration/LoginSvg')
  },
  computed: {
    flexDirection() {
      let breakpoints = val => {
        switch (val) {
        }
      }
      return breakpoints
    },
    textBreak() {
      return this.$mq == 'xxl' ? true : this.$mq == 'xl' ? true : false
    }
  }
}
</script>
