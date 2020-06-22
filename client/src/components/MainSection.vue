<template>
  <section id="main-section" :class="mainClass" class="">
    <div class="main-content" :class="subClass">
      <div class="up">
        <div class="one flex items-center lg:grid lg:grid-cols-5">
          <slot name="left-one" class="mr-auto lg:col-span-1"></slot>
          <slot
            name="center-one"
            class="lg:col-span-3 xs:hidden xl:col-span-1"
          ></slot>
          <slot name="right-one" class="ml-auto lg:col-span-1"></slot>
        </div>
        <div class="two mt-4 xl:hidden">
          <slot name="left-two"></slot>
        </div>
      </div>
      <div class="down mt-6">
        <slot name="content"></slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Main',
  props: {
    mainClass: String,
    subClass: String
  }
}
</script>
