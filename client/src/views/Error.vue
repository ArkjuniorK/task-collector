<template>
  <div
    id="error"
    class="text-center flex flex-col justify-center md:mt-20 lg:flex-row"
  >
    <error-svg></error-svg>
    <div
      class="error-msg mt-4 grid lg:text-left lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:ml-5 xl:leading-none"
    >
      <span class="font-body font-bold text-6xl lg:text-7xl xl:text-10xl"
        >404</span
      >
      <span class="font-display font-bold lg:text-lg xl:text-4xl"
        >Halaman Tidak Ditemukan</span
      >
      <span class="font-display mt-3 xl:text-2xl"
        >Pastikan Untuk Memeriksa Alamat URL Dengan Cermat</span
      >
      <div
        class="separator flex items-center justify-center my-5 lg:justify-start"
      >
        <span class="border-b w-10 border-dark-200 rounded xl:w-8"></span>
        <span class="font-display text-sm mx-3 xl:text-base">atau</span>
        <span class="border-b w-10 border-dark-200 rounded xl:w-8"></span>
      </div>
      <router-link
        to="/login"
        class="font-display flex items-center justify-center lg:justify-start xl:text-2xl hover:text-dark-200"
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
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  components: {
    errorSvg: () => import('../components/illustration/ErrorSvg')
  }
}
</script>
