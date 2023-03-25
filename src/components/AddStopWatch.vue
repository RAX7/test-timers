<script setup lang="ts">
import AddIcon from '@/assets/icons/add-icon.svg?component'

const emit = defineEmits(['add-new'])

function onAdd() {
  emit('add-new')
}
</script>

<template>
  <div class="stopwatch-add">
    <button @click="onAdd" class="stopwatch-add__button" aria-label="Add stopwatch">
      <AddIcon></AddIcon>
    </button>
  </div>
</template>

<style>
.stopwatch-add {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-item-background);
}

.stopwatch-add__button {
  box-sizing: content-box;
  width: 20px;
  height: 20px;
  padding: 10px;
  margin: 0;
  background-color: transparent;
  color: var(--color-text);
  border: none;
  border-radius: 50%;
  transition: background-color 350ms linear;
}

.stopwatch-add__button:hover {
  cursor: pointer;
  background-color: var(--color-background);
}
</style>
