<template>
  <div>
    <section class="hero is-medium is-light is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">{{title}}</h1>
          <h2 class="subtitle">{{subtitle}}</h2>
          <PerformanceIndicator :moves="result.moves" :time="result.time"
                                :steps="result.steps"/>
        </div>
      </div>
    </section>
    <Player :disks="disks" :history="result.history"/>
  </div>
</template>

<script>
  import Player from "./Player"
  import PerformanceIndicator from "./PerformanceIndicator"
  import {search} from "../worker"

  export default {
    name: "Demo",
    props: ['disks', 'title', 'subtitle', 'h'],
    components: {
      PerformanceIndicator,
      Player
    },
    computed: {
      result() {
        return search(this.disks, this.h);
      }
    },
  }
</script>

<style scoped>

</style>
