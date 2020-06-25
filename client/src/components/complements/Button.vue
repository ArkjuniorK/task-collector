<template>
  <button
    :type="btnType"
    class="font-display rounded focus:outline-none flex items-center justify-center xs:w-full xl:text-lg lg:w-full xl:w-auto"
    :class="[btnClass, disabled]"
    @click="$emit('clicked')"
  >
    <slot>{{ name }}</slot>
    <slot name="icon"></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    name: String || Number,
    btnClass: String,
    btnType: String,
    btnDisabled: Boolean
  },
  computed: {
    disabled() {
      return this.btnDisabled ? 'opacity-50 cursor-not-allowed' : ''
    },
    disabledStatus() {
      return this.btnDisabled ? 'disabled' : 'enabled'
    }
  }
}
</script>
