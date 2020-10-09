<template>
  <section id="main-section" :class="mainClass">
    <div class="flex flex-col justify-between main-content" :class="subClass">
      <div class="up-middle">
        <div class="up">
          <div
            id="one"
            class="flex items-center justify-between one xl:grid xl:grid-cols-3"
          >
            <div id="left-one" class="mr-auto xl:col-span-1">
              <slot name="left-one"></slot>
            </div>
            <div id="center-one" class="xl:col-span-1">
              <slot name="center-one"></slot>
            </div>
            <div id="right-one" class="ml-auto xl:col-span-1">
              <slot name="right-one"></slot>
            </div>
          </div>
          <div id="two" class="mt-4 xl:hidden">
            <slot name="center-two"></slot>
          </div>
        </div>
        <div class="mt-6 middle">
          <slot name="content"></slot>
        </div>
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
