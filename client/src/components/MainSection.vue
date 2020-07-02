<template>
  <section id="main-section" :class="mainClass" class="">
    <div class="main-content flex flex-col justify-between" :class="subClass">
      <div class="up-middle">
        <div class="up">
          <div
            class="one flex justify-between items-center xl:grid xl:grid-cols-3"
          >
            <div id="left-one" class="mr-auto xl:col-span-1">
              <slot name="left-one"></slot>
            </div>
            <div id="center-one" class="mx-auto xl:col-span-1">
              <slot name="center-one"></slot>
            </div>
            <div id="right-one" class="xl:col-span-1">
              <slot name="right-one"></slot>
            </div>
          </div>
          <div class="two mt-4 xl:hidden">
            <slot name="first-two"></slot>
          </div>
        </div>
        <div class="middle mt-6">
          <slot name="content"></slot>
        </div>
      </div>

      <div class="bottom mt-8">
        <slot name="paginate"></slot>
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
