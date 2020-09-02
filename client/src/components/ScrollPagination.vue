<template>
  <div id="scroll-pagination">
    <div v-if="currentPage != totalPages" :class="loadShow">
      <my-btn
        @clicked="$emit('load')"
        btnType="button"
        btnClass="p-2 hover:text-dark-200 focus:bg-light-200 mx-auto"
      >
        Lebih Banyak
        <template v-slot:icon>
          <div class="w-4 icon">
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
</template>

<script>
export default {
  name: 'ScrollPagination',
  components: {
    myBtn: () => import('../components/complements/Button')
  },
  props: ['totalPages', 'totalRecords', 'totalData', 'currentPage'],
  computed: {
    loadShow() {
      return this.totalPages == null || !this.totalPages ? 'hidden' : ''
    }
  }
}
</script>
