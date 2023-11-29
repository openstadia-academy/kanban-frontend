<script setup lang="ts">
import type { Board } from '@/models/Board'
import BoardItem from '@/components/BoardItem.vue'
import { useRouter } from 'vue-router'
import EditableText from '@/components/EditableText.vue'
import { onMounted, ref } from 'vue'
import { create, deleteById, getAll } from '@/apis/boards'

const router = useRouter()
const boards = ref<Board[]>([])

onMounted(async () => {
  boards.value = await getAll()
})
const onBoardClick = (board: Board) => {
  router.push('/boards/' + board.id)
}

const onAddBoard = async (value: string) => {
  const board = await create({
    title: value
  })

  if (board) {
    boards.value.push(board)
  }
}

const onDelete = async (id: string) => {
  const board = await deleteById(id)

  if (!board) {
    return
  }

  boards.value = boards.value.filter((b) => b.id != board.id)
}
</script>

<template>
  <div class="boards-view">
    <BoardItem
      class="board-item"
      v-for="board in boards"
      :key="board.id"
      :board="board"
      @click="onBoardClick(board)"
      @delete="onDelete"
    />

    <div class="add-board">
      <EditableText text="Add Board" @change="onAddBoard" />
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
