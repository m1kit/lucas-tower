<template>
  <div class="columns piles">
    <div v-for="i in 3" v-bind:key="i" class="column pile">
      <div class="disks">
        <template v-for="j in disks" class="disks">
          <div v-bind:class="{'show': Math.floor(state/Math.pow(3, j - 1)) % 3 === i - 1}"
               v-bind:key="j" v-bind:style="{'width': (20 + 80 / disks * j) + '%' }" class="disk">{{j}}
          </div>
        </template>
      </div>
      <div class="pole" v-bind:style="{'height': (2 * disks) + 'rem' }"></div>
      <div class="base">Pile number {{i}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Simulator",
    props: ['disks', 'state'],
  }
</script>

<style scoped>

  .disk {
    background-color: #fcc800;
    box-shadow: 2px 2px #fce000 inset;
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
    border-radius: 0.5rem;
    transition: all 0.5s;
    border: solid 0;
    opacity: 0;
    max-height: 0;
  }

  .disk.show {
    border: solid 2px #e9bc00;
    opacity: 1;
    max-height: 2rem;
    font-weight: bold;
  }

  .disks {
    position: absolute;
    bottom: 2rem;
    left: 0;
    right: 0;
    margin: auto;
    width: 90%;
  }

  .pile {
    margin: 10px;
    position: relative;
    padding-bottom: 0;
  }

  .piles {
    width: 95%;
    margin: auto;
    text-align: center;
  }

  .pole {
    margin: auto;
    background-color: saddlebrown;
    width: 5%;
    height: 800px;
    border-radius: 1rem 1rem 0 0;
  }

  .base {
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    background-color: saddlebrown;
    border-radius: 1rem;
    color: white;
    font-weight: bold;
    box-shadow: -2px -4px #702008 inset;
  }
</style>
