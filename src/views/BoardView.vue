<script setup lang="ts">
import Draggable from 'vuedraggable'
import EditableText from '@/components/EditableText.vue'
import BoardListItem from '@/components/BoardListItem.vue'
import { onMounted, ref } from 'vue'
import type { BoardList } from '@/models/BoardList'
import type { Board } from '@/models/Board'
import { getById } from '@/apis/boards'
import { create, deleteById, getByBoardId } from '@/apis/boardLists'
import { useRouter } from 'vue-router'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const board = ref<Board | null>(null)
const lists = ref<BoardList[]>([])

onMounted(async () => {
  board.value = await getById(props.id)

  if (!board.value) {
    return
  }

  lists.value = await getByBoardId(board.value.id)
})

const onAddList = async (value: string) => {
  let index = 0
  if (lists.value.length > 0) {
    const lastIndex = lists.value.length - 1
    index = lists.value[lastIndex].index + 1
  }

  const list = await create({
    title: value,
    board_id: props.id,
    index: index
  })

  if (!list) {
    return
  }

  lists.value.push(list)
}

const onClick = () => {
  router.push('/boards')
}

const onDelete = async (id: string) => {
  const list = await deleteById(id)

  if (!list) {
    return
  }

  lists.value = lists.value.filter((l) => l.id != list.id)
}
</script>

<template>
  <div class="board-view">
    <div v-if="board" class="title" @click="onClick">{{ board.title }}</div>

    <div class="lists_wrapper">
      <Draggable class="lists" :list="lists" group="lists" itemKey="id">
        <template #item="{ element }">
          <BoardListItem class="list-item" @delete="onDelete" :board-list="element" />
        </template>
      </Draggable>

      <div class="add-list">
        <EditableText text="Add List" @change="onAddList" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.board-view {
  display: flex;
  flex-direction: column;
  margin: 8px;
}

.title {
  font-size: 48px;
}

.lists_wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 8px;
}

.lists {
  display: flex;
  flex-direction: row;
}

.list-item:not(:first-child) {
  margin-left: 8px;
}

.add-list {
  width: 250px;
  padding: 16px;
  margin-left: 8px;
  border: 2px dotted black;
  background-color: lightgray;
}
</style>
