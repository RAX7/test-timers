<script lang="ts">
const formatTimestamp = (value: number) => {
  const sc = Math.floor((value / 1000) % 60)
  const mn = Math.floor((value / 1000 / 60) % 60)
  const hr = Math.floor((value / 1000 / 60 / 60) % 60)

  if (hr === 0 && mn === 0) {
    return `${sc}`
  } else if (hr === 0) {
    return `${mn}:${sc.toString().padStart(2, '0')}`
  } else {
    return `${hr}:${mn.toString().padStart(2, '0')}:${sc.toString().padStart(2, '0')}`
  }
}
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGlobalRaf } from '@/utils/useGlobalRaf'

import DeleteIcon from '@/assets/icons/delete-icon.svg?component'
import PlayIcon from '@/assets/icons/play-icon.svg?component'
import PauseIcon from '@/assets/icons/pause-icon.svg?component'
import StopIcon from '@/assets/icons/stop-icon.svg?component'

const emit = defineEmits(['delete-item'])

const { timestamp: rafTimestamp, play: rafPlay, pause: rafPause } = useGlobalRaf()
const isRunning = ref(false)
const isReset = ref(true)
const defaultTimeValue = '0'

let totalTime = 0
let startTime = 0

function onPlay() {
  isRunning.value = !isRunning.value

  if (isRunning.value) {
    rafPlay()
    isReset.value = false
    startTime = rafTimestamp.value
  } else {
    rafPause()
    totalTime += rafTimestamp.value - startTime
  }
}

function onStop() {
  isRunning.value = false
  isReset.value = true
  rafPause()
  totalTime = 0
}

function onDelete() {
  emit('delete-item')
}

const formatedTime = computed(() => {
  return isReset.value
    ? defaultTimeValue
    : formatTimestamp(totalTime + rafTimestamp.value - startTime)
})
</script>

<template>
  <div class="stopwatch-timer" :class="{ 'stopwatch-timer--running': isRunning }">
    <button @click="onDelete" class="stopwatch-timer__delete" aria-label="Delete button">
      <DeleteIcon></DeleteIcon>
    </button>

    <div class="stopwatch-timer__time">{{ formatedTime }}</div>

    <div class="stopwatch-timer__controls">
      <button @click="onPlay" class="stopwatch-timer__play" aria-label="Play/pause button">
        <PlayIcon v-if="!isRunning"></PlayIcon>
        <PauseIcon v-else></PauseIcon>
      </button>

      <button @click="onStop" class="stopwatch-timer__pause" aria-label="Reset button">
        <StopIcon></StopIcon>
      </button>
    </div>
  </div>
</template>

<style>
.stopwatch-timer {
  --color: var(--color-text-inactive);
  position: relative;
  color: var(--color);
  background-color: var(--color-item-background);
}

.stopwatch-timer--running {
  --color: var(--color-text);
  color: var(--color);
}

.stopwatch-timer__delete {
  box-sizing: content-box;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  padding: 10px;
  right: 5px;
  top: 5px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  color: var(--color);
  transition: background-color 350ms linear;
}

.stopwatch-timer__delete:hover {
  cursor: pointer;
  background-color: var(--color-background);
}

.stopwatch-timer__time {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  font-size: 1.375em;
  line-height: 1;
  border-bottom: 1px solid var(--color);
}

.stopwatch-timer__controls {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
}

.stopwatch-timer__play,
.stopwatch-timer__pause {
  box-sizing: content-box;
  width: 20px;
  height: 20px;
  padding: 10px;
  color: inherit;
  background-color: transparent;
  margin: 0 15px;
  border: none;
  border-radius: 50%;
  transition: background-color 350ms linear;
}

.stopwatch-timer__play:hover,
.stopwatch-timer__pause:hover {
  cursor: pointer;
  background-color: var(--color-background);
}
</style>
