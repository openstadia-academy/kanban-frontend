<script setup lang="ts">
import type { Board } from '@/models/board'

const props = defineProps<{
  board: Board
}>()

const emit = defineEmits<{
  (e: 'delete', id: string): void
}>()
</script>

<template>
  <div class="board-item">
    <div>{{ props.board.title }}</div>

    <div class="delete" @click.stop="emit('delete', board.id)">X</div>
  </div>
</template>

<style scoped>
.board-item {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 200px;
  height: 150px;

  border: 2px solid black;
  border-radius: 16px;
  background-color: coral;

  font-size: 32px;
}

.delete {
  position: absolute;
  top: 0;
  right: 16px;

  cursor: pointer;
  color: red;
}
</style>
