<template>
  <div
    class="selection absolute z-20 w-full right-0 left-0 top-0 bottom-0 flex items-center"
    @click="$emit('clicked')"
  >
    <div
      class="wrapper rounded bg-light-100 mx-5 absolute z-50 right-0 left-0 xl:mx-auto xl:w-1/3"
      @click.stop
    >
      <slot name="one" />
    </div>
    <div
      class="wrapper rounded bg-light-100 mx-5 absolute z-50 right-0 left-0 xl:mx-auto xl:w-1/3"
      @click.stop
    >
      <slot name="two" />
    </div>
    <div
      class="wrapper rounded bg-light-100 mx-5 absolute z-50 right-0 left-0 xl:mx-auto xl:w-1/3"
      @click.stop
    >
      <slot name="three" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    one: { type: [Boolean, String], default: true },
    two: { type: [Boolean, String], default: false },
    three: { type: [Boolean, String], default: false }
  }
}
</script>
