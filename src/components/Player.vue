<template>
  <div class="player">
    <Simulator :disks="disks" :state="history[now]"/>
    <section class="controller">
      <b-slider v-model="now" :min="0" :max="history.length - 1" type="is-warning"/>
      <b-field class="but">
        <p class="control">
          <b-button @click="now--" :disabled="playing != null || now === 0" type="is-warning" outlined rounded>
            Prev
          </b-button>
        </p>
        <p class="control pause-button">
          <b-button v-if="playing == null" expanded @click="play()" type="is-warning" outlined>
            Play
          </b-button>
          <b-button v-else expanded @click="pause()" type="is-warning" outlined>
            Pause
          </b-button>
        </p>
        <p class="control">
          <b-button @click="now++" :disabled="playing != null || now === history.length - 1" type="is-warning" outlined rounded>
            Next
          </b-button>
        </p>
      </b-field>
    </section>
  </div>
</template>

<script>
  import Simulator from "./Simulator";

  export default {
    name: "Player",
    props: ['disks', 'history'],
    components: {Simulator},
    data() {
      return {
        now: 0,
        playing: null,
      }
    },
    methods: {
      play: function () {
        if (this.now === this.history.length - 1) this.now = 0;
        const maxTime = this.history.length * 500;
        this.playing = setInterval(this.tick, Math.ceil(maxTime / this.history.length));
      },
      pause: function () {
        clearInterval(this.playing);
        this.playing = null;
      },
      tick: function () {
        if (this.now === this.history.length - 1) this.pause();
        else this.now++;
      }
    }
  }
</script>

<style scoped>
  .player {
    margin: 20px auto;
  }
  .controller {
    width: 95%;
    margin: auto;
  }
  .pause-button {
    width: 100%;
  }
</style>
