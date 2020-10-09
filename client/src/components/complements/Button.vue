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
  props: [
    'name',
    'btnClass',
    'btnType',
    'btnDisabled'
    // { small: { type: String, default: 'xl:text-sm' } },
    // { normal: { type: String, default: '' } }
  ],
  /* props: {
    name: String || Number,
    btnClass: String || Array,
    btnType: String,
    btnDisabled: Boolean,
    small: {
      type: String,
      default: 'xl:text-sm'
    },
    normal: {
      type: String,
      default: ''
    }
  }, */
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
