<template>
  <div class="home w-full">
    <div class="home-child">
      <task-card></task-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
    taskCard: () => import('../components/TaskCard')
  }
}
</script>
