<script setup lang="ts">
import { ref } from 'vue'
import StopWatch from './components/StopWatch.vue'
import AddStopWatch from './components/AddStopWatch.vue'

const stopWatchList = ref([Symbol()])

function onAddNew() {
  stopWatchList.value.push(Symbol())
}

function onDeleteItem(keySymbol: symbol) {
  const idx = stopWatchList.value.findIndex((s) => s === keySymbol)

  if (idx > -1) {
    stopWatchList.value.splice(idx, 1)
  }
}
</script>

<template>
  <div class="app">
    <StopWatch
      v-for="keySymbol of stopWatchList"
      :key="keySymbol"
      @deleteItem="onDeleteItem(keySymbol)"
    ></StopWatch>
    <AddStopWatch @addNew="onAddNew"></AddStopWatch>
  </div>
</template>

<style>
.app {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 120px;
  gap: 50px;
  padding-top: 50px;
}

@media (min-width: 768px) {
  .app {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .app {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
