<template>
  <div
    class="task-card col-span-1 text-left p-4 rounded flex flex-col justify-between h-32 xl:h-56 xl:p-6 xxxl:h-64"
    :class="cardClass"
    @click="cardClicked"
  >
    <div class="up flex flex-col">
      <span class="font-sans text-xs xxxl:text-base">
        {{ subject }}
      </span>
      <span
        class="font-bold text-base mt-2 sm:text-base md:leading-tight xl:text-2xl xl:leading-tight xxxl:text-3xl"
      >
        {{ intercate(title) }}
      </span>
    </div>
    <div class="down flex items-center justify-between">
      <span class="text-xs xl:text-sm xxxl:text-base">
        {{ date | date }}
      </span>
      <my-btn
        name="Lihat"
        btnClass="hover:text-dark-300 xs:hidden xl:flex p-1"
        btnType="button"
        @clicked="btnClicked"
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
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'TaskCard',
  props: {
    title: String,
    subject: String,
    date: String,
    cardClass: String
  },
  components: {
    myBtn: () => import('./Button')
  },
  methods: {
    intercate(val) {
      switch (this.$mq) {
        case 'xs':
          return val.length >= 22 ? val.slice(0, 19) + '...' : val
        case 'sm':
          return val.length >= 33 ? val.slice(0, 30) + '...' : val
        case 'smmd':
          return val.length >= 48 ? val.slice(0, 45) + '...' : val
        case 'md':
          return val.length >= 56 ? val.slice(0, 53) + '...' : val
        case 'lg':
          return val.length >= 63 ? val.slice(0, 60) + '...' : val
        case 'xl':
          return val.length >= 53 ? val.slice(0, 50) + '...' : val
        case 'xxl':
          return val
      }
    },
    async cardClicked() {},
    async btnClicked() {}
  },
  filters: {
    date(val) {
      return moment(val)
        .locale('id')
        .format('DD MMMM YYYY')
    }
  }
}
</script>
