<template>
  <div id="app">
    <section class="hero is-fullheight is-warning is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Tower of Hanoi solver</h1>
          <h2 class="subtitle">CSC.T272 Artificial Intelligence</h2>
          <h2 class="subtitle">Mikihito Matsuura</h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="title is-4">Game specification</h2>
        <ul class="spec-list">
          <li>There are 3 piles.</li>
          <li>At first, {{disks}} disks with different sizes are put in the first pile.</li>
          <li>You can move only one disk at a time.</li>
          <li>You can move a disk on the top of piles to the top of other piles.</li>
          <li>You cannot put a larger disk on a smaller disk.</li>
          <li>Can you move all disks into the third pile?</li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="title is-4">Solver configuration</h2>
        <b-field label="Number of disks" :message="['Higher number may result in hanging up.']">
          <b-numberinput v-model="disks" :min="2" :max="10" size="is-medium" type="is-warning"
                         controls-position="compact"/>
        </b-field>
      </div>
    </section>

    <DPDemo title="Optimal solution"
            subtitle="Computed with BFS + Dynamic Programming"
            :disks="disks"/>
    <Demo v-if="disks<=3"
          title="A*Search Demo"
          subtitle="Computed with ASearch with h'(x)=0"
          :disks="disks" :h="h0"/>
    <Demo v-if="disks<=4"
          title="A*Search Demo"
          subtitle="Computed with ASearch with h2"
          :disks="disks" :h="h1"/>

    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>A* search demo on lucas' tower</strong> by Mikihito Matsuura. The source code is hosted at
          <a href="https://github.com/m1kit/lucas-tower">GitHub</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
  import DPDemo from "./components/DPDemo"
  import Demo from "./components/Demo"

  export default {
    name: 'app',
    components: {
      Demo,
      DPDemo,
    },
    data() {
      return {
        disks: 3,
        h0: _ => 0, // eslint-disable-line no-unused-vars
        h1: s => {
          let t = s, cost = 0;
          for (let i = 0; i < this.disks; i++) {
            cost += (2 - t % 3) * (i + 1);
            t = Math.floor(t / 3);
          }
          return cost;
        },
        h2: s => Math.pow(3, this.disks) - s,
      };
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .spec-list {
    list-style-type: circle;
  }
</style>
