<template>
  <div id="input" @click="$emit('clicked')">
    <div
      id="input-child"
      class="flex justify-between p-4 font-sans rounded select-none bg-light-200"
      :class="parClass"
    >
      <input
        v-if="input"
        v-model="localValue"
        :class="inClass"
        :placeholder="placeholder"
        :type="type"
        class="bg-light-200"
        name="input"
      />
      <textarea
        v-if="textarea"
        v-model="localValue"
        :placeholder="placeholder"
        :class="txtClass"
        class="resize-none bg-light-200"
        name="textarea"
        :cols="textAreaCols"
        rows="3"
      ></textarea>
      <slot name="icon"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: [
    'value',
    'parClass',
    'placeholder',
    'input',
    'textarea',
    'type',
    'inClass',
    'txtClass'
  ],
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(localValue) {
        this.$emit('input', localValue)
      }
    },
    textAreaCols() {
      return this.$mq > 'lg' ? '60' : '100'
    }
  }
}
</script>
