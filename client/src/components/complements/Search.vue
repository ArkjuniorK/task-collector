<template>
  <div
    class="flex items-center w-full p-3 search font-display bg-light-200 rounded-md"
    :class="srClass"
  >
    <div class="w-4 ml-2 mr-3 icon text-dark-300 xxl:w-5">
      <slot name="icon"></slot>
    </div>
    <input
      @click="$emit('clicked')"
      v-model="search"
      type="text"
      class="w-full bg-light-200 text-display placeholder-dark-100"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Search',
  props: ['placeholder', 'srClass', 'routeName'],
  data: () => ({
    search: ''
  }),
  methods: {},
  watch: {
    search: _.debounce(async function(value) {
      let route = {
        name: this.routeName
      }

      /* if this.search not used return nothing */
      if (!this.search) return this.$router.push(route)
      /*this.$router.push(route)*/

      /* if this.search is used add query on route */
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }

      this.$router.push(route)
    }, 1000),
    '$route.query.search': {
      immediate: true,
      async handler(value) {
        this.search = await value
      }
    }
  }
}
</script>
