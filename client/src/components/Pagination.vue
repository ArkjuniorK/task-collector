<template>
  <div id="pagination" class="flex items-center justify-between">
    <div class="left">
      <my-btn
        type="button"
        btnClass="flex-row-reverse p-2 bg-light-200"
        @clicked="$emit('prev')"
        :btnDisabled="prevBtn"
      >
        <template v-slot:icon>
          <div class="icon w-5">
            <svg
              class="fill-current w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z"
              />
            </svg>
          </div>
        </template>
      </my-btn>
    </div>
    <div class="center flex items-center">
      <my-btn
        v-for="page in pages"
        :key="page.index"
        :name="page.name | toNum"
        type="button"
        btnClass="py-1 px-2 bg-light-300 mx-1"
        :btnDisabled="page.isDisabled"
        @clicked="$emit('page', page.name)"
      ></my-btn>
    </div>
    <div class="right">
      <my-btn
        type="button"
        @clicked="$emit('next')"
        btnClass="bg-light-200 p-2"
        :btnDisabled="nextBtn"
      >
        <template v-slot:icon>
          <div class="icon w-5">
            <svg
              class="w-full h-full fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"
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
  name: 'Pagination',
  components: {
    myBtn: () => import('../components/complements/Button')
  },
  props: {
    maxVisible: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  methods: {},
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1
      }

      if (this.currentPage === this.totalPages) {
        if (this.totalPages <= 2) {
          return this.totalPages - this.maxVisible + 2
        }
        return this.totalPages - this.maxVisible + 1
      }

      return this.currentPage - 1
    },
    endPage() {
      return Math.min(this.startPage + this.maxVisible - 1, this.totalPages)
    },
    pages() {
      /* define range with empty range */
      const range = []

      /* for loop to fill the range */
      for (let i = this.startPage; i <= this.endPage; i++) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        })
      }

      /* return the range */
      return range
    },
    prevBtn() {
      return this.currentPage === 1 ? true : false
    },
    nextBtn() {
      return this.currentPage === this.totalPages ? true : false
    }
  },
  filters: {
    toNum(val) {
      return val.toString()
    }
  }
}
</script>
