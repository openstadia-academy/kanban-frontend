<script setup lang="ts">
import type {BoardTask} from "@/models/BoardTask";

const props = defineProps<{
  boardTask: BoardTask
}>()
</script>

<template>
  <div class="board-task-item">
    <div> {{ props.boardTask.title }} </div>
  </div>
</template>

<style scoped>
.board-task-item {
  overflow-wrap: break-word;
  padding: 16px;
  margin: 8px;
  border: 2px solid black;
  background-color: lime;
}
</style>
