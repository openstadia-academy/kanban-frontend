<script setup lang="ts">
import Draggable from 'vuedraggable'
import type { BoardList } from '@/models/BoardList'
import BoardTaskItem from '@/components/BoardTaskItem.vue'
import EditableText from '@/components/EditableText.vue'
import { create, getByListId } from '@/apis/boardTask'
import { onMounted, ref } from 'vue'
import type { BoardTask } from '@/models/BoardTask'

const props = defineProps<{
  boardList: BoardList
}>()

const emit = defineEmits<{
  (e: 'delete', id: string): void
}>()

const tasks = ref<BoardTask[]>([])

onMounted(async () => {
  tasks.value = await getByListId(props.boardList.id)
})

const onAddTask = async (value: string) => {
  const tasksValue = tasks.value
  let index = 0
  if (tasksValue.length > 0) {
    const lastIndex = tasksValue.length - 1
    index = tasksValue[lastIndex].index + 1
  }

  const task = await create({
    title: value,
    index: index,
    list_id: props.boardList.id
  })

  if (!task) {
    return
  }

  tasks.value.push(task)
}
const onChange = async ({ moved }) => {
  const newIndex = moved.newIndex
  const lastIndex = tasks.value.length - 1

  let index
  if (newIndex == 0) {
    index = tasks.value[1].index - 1
  } else if (newIndex == lastIndex) {
    index = tasks.value[lastIndex - 1].index + 1
  } else {
    index = (tasks.value[newIndex - 1].index + tasks.value[newIndex + 1].index) / 2
  }
}
</script>

<template>
  <div class="board-list-item">
    <div class="header">
      <div class="title">{{ boardList.title }}</div>

      <div class="delete" @click.stop="emit('delete', boardList.id)">X</div>
    </div>

    <div class="add-task">
      <EditableText text="Add task" @change="onAddTask" />
    </div>

    <Draggable class="list-group" :list="tasks" group="tasks" itemKey="id" @change="onChange">
      <template #item="{ element }">
        <BoardTaskItem :board-task="element" />
      </template>
    </Draggable>
  </div>
</template>

<style scoped>
.board-list-item {
  padding: 8px;
  border: 2px solid black;
  background-color: pink;
}

.list-group {
  width: 240px;
  min-height: 100%;
}

.header {
  display: flex;
  flex-direction: row;

  margin: 0 8px;
  font-size: 32px;
}

.title {
  flex: 1;
}

.delete {
  color: red;
  cursor: pointer;
}

.add-task {
  padding: 16px;
  margin: 8px;
  border: 2px dotted black;
  background-color: lightgray;
}
</style>
