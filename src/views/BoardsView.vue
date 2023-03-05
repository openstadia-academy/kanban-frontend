<script setup lang="ts">
import type {Board} from "@/models/Board";
import BoardItem from "@/components/BoardItem.vue";
import {boardService} from "@/services/BoardService";
import {useRouter} from "vue-router";
import EditableText from "@/components/EditableText.vue";

const boards = boardService.getAll()

const router = useRouter()

const onBoardClick = (board: Board) => {
  router.push('/boards/' + board.id)
}

const onAddBoard = (value: string) => {
  boardService.create({
    title: value
  })
}

</script>

<template>
  <div class="boards-view">
    <BoardItem class="board-item" v-for="board in boards" :key="board.id" :board="board" @click="onBoardClick(board)"/>

    <div class="add-board">
      <EditableText text="Add Board" @change="onAddBoard"/>
    </div>

  </div>
</template>

<style scoped>
.boards-view {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  margin: 32px;
}

.board-item {
  margin-bottom: 32px;
}

.board-item:not(:last-child) {
  margin-right: 32px;
}

.add-board {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 200px;
  height: 150px;

  border: 2px dotted black;
  border-radius: 16px;
  background-color: lightgray;

  font-size: 32px;
}
</style>
