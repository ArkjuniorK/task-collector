<template>
  <button
    :type="btnType"
    class="flex items-center justify-center rounded transition duration-200 font-display focus:outline-none xs:w-full lg:w-full xl:w-auto"
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
    name: {
      type: [String, Number],
      default: null
    },
    btnClass: {
      type: String,
      default: null
    },
    btnType: {
      type: String,
      default: 'button'
    },
    btnDisabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    disabled() {
      return this.btnDisabled ? 'opacity-50 cursor-not-allowed' : ''
    }
  }
}
</script>
