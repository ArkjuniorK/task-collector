<template>
  <div id="card" class="relative w-full h-full text-left mt-4">
    <div
      class="card-front z-10 relative w-full left-0 right-0 p-3 rounded-md flex justify-between items-center"
      :class="bgCard"
    >
      <div class="right flex flex-col font-sans">
        <span class="text-sm">{{ id }}</span>
        <span class="font-bold mt-1">{{ name }}</span>
      </div>
      <div class="left">
        <my-btn btnClass="rounded-full p-2" @clicked="open = !open">
          <template v-slot:icon>
            <div class="icon w-4">
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
        </my-btn>
      </div>
    </div>
    <div class="card-behind relative bg-light-200 rounded-md" v-if="open">
      <div class="complement px-3 py-5 flex flex-col">
        <span class="text-sm">
          Jenis Kelamin :
          <span class="font-bold">{{ gender }}</span>
        </span>
        <span class="text-sm mt-1">
          Alamat :
          <span class="font-bold">{{ address }}</span>
        </span>
        <span class="text-sm mt-1">
          TTL :
          <span class="font-bold">{{ birth }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentCard',
  props: ['id', 'name', 'gender', 'address', 'birth', 'bgCard'],
  components: {
    myBtn: () => import('./Button')
  },
  data: () => ({
    open: false
  }),
  computed: {}
}
</script>

<style>
#card:nth-child(even) {
  background-color: #b7cfff;
}
#card:nth-child(odd) {
  background-color: #f7fafc;
}
</style>
