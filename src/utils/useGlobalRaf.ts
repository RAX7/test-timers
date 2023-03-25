import { ref, onMounted, onUnmounted, type Ref } from 'vue'

interface IGlobalRafResult {
  timestamp: Ref<number>
  play(): void
  pause(): void
}

const watchRefs = new Set<Ref<number>>()

let rafId: null | number = null
let globalTimestamp = 0

function rafLoop(now: number) {
  globalTimestamp = now
  watchRefs.forEach((r) => (r.value = now))
  rafId = requestAnimationFrame(rafLoop)
}

export function useGlobalRaf(): IGlobalRafResult {
  const timestamp = ref(0)

  onMounted(() => {
    if (!rafId) {
      rafId = requestAnimationFrame(rafLoop)
    }
  })

  onUnmounted(() => {
    watchRefs.delete(timestamp)

    if (watchRefs.size === 0 && rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  })

  function play() {
    timestamp.value = globalTimestamp
    watchRefs.add(timestamp)
  }

  function pause() {
    watchRefs.delete(timestamp)
  }

  return { timestamp, play, pause }
}
