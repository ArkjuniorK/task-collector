<template>
  <div
    class="flex flex-col justify-between h-32 p-4 text-left rounded task-card col-span-1 xl:h-48 xl:p-6 xxxl:h-56"
    :class="cardClass"
    @click="$emit('cardClicked')"
  >
    <div class="flex flex-col up">
      <span class="font-display text-xs lg:text-base">{{ subject }}</span>
      <span
        class="h-10 mt-2 text-base font-bold sm:text-base md:leading-tight xl:text-2xl xl:leading-tight xxxl:text-3xl"
      >
        <v-clamp autoresize :max-lines="2">{{ title }}</v-clamp>
      </span>
    </div>
    <div class="flex items-center justify-between down">
      <span v-if="subtheme >= 0" class="text-xs xl:text-sm xxxl:text-base">{{ subtheme }} Subtema</span>
      <span v-else-if="task >= 0" class="text-xs xl:text-sm xxxl:text-base">{{ task }} Tugas</span>
      <span v-else class="text-xs xl:text-sm xxxl:text-base">{{ date | date('id') }}</span>

      <my-btn
        btn-class="hover:text-dark-100 xs:hidden xl:flex p-1"
        btn-type="button"
        @clicked="$emit('btnClicked')"
      >
        Lihat
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
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'TaskCard',
  components: {
    myBtn: () => import('./Button'),
    VClamp: () => import('vue-clamp')
  },
  filters: {
    date(val, valB) {
      return moment(val)
        .locale(valB)
        .format('DD MMMM YYYY')
    }
  },
  props: ['subject', 'title', 'date', 'subtheme', 'task', 'cardClass']
}
</script>

<style>
.clamp {
  max-height: 3rem;
}
</style>
