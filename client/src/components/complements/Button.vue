<template>
  <button
    :type="btnType"
    class="font-display rounded text-dark-100 focus:outline-none flex items-center justify-center xs:w-full xl:text-lg lg:w-full xl:w-auto"
    :class="btnClass"
    @click="$emit('clicked')"
  >
    {{ name }}
    <slot name="icon"></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    name: String,
    btnClass: String,
    btnType: String
  }
}
</script>
