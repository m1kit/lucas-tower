<template>
  <div class="tile is-ancestor indicator">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title is-5">Moves</p>
        <div class="content">
          {{moves}} moves
        </div>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title is-5">Time to search</p>
        <div class="content">
          {{time.toFixed(2)}} ms
        </div>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title is-5">Steps to search</p>
        <div class="content">
          {{steps}} steps
        </div>
      </article>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PerformanceIndicator",
    props: ['moves', 'time', 'steps']
  }
</script>

<style scoped>
  .indicator {
    text-align: center;
  }
</style>
