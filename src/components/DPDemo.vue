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
  import {solveDP} from "../worker"

  export default {
    name: "DPDemo",
    props: ['disks', 'title', 'subtitle'],
    components: {
      PerformanceIndicator,
      Player
    },
    computed: {
      result() {
        return solveDP(this.disks);
      }
    },
    /*asyncComputed: {
      history: {
        get() {
          //return this.$worker.exec('solveDP', [0, Math.pow(3, this.disks) - 1, this.disks]);
          return this.$worker.exec('test')
            .then((f) => {
              window.console.log(f);
            });
        },
        default: [0]
      }
    }*/
  }
</script>

<style scoped>

</style>
