<script setup lang="ts">
import Draggable from "vuedraggable"
import type {BoardList} from "@/models/BoardList";
import BoardTaskItem from "@/components/BoardTaskItem.vue";
import {boardListService} from "@/services/BoardListService";
import EditableText from "@/components/EditableText.vue";
import {boardTaskService} from "@/services/BoardTaskService";

const props = defineProps<{
  boardList: BoardList
}>()

const tasks = boardTaskService.getByListId(props.boardList.id)

const onAddTask = (value: string) => {
  const tasksValue = tasks.value;
  let index = 0
  if (tasksValue.length > 0) {
    index = tasksValue[tasksValue.length - 1].index + 1
  }

  boardTaskService.create({
    title: value,
    index: index,
    list_id: props.boardList.id
  })
}

const onDeleteList = () => {
  boardListService.deleteById(props.boardList.id)
}

</script>

<template>
  <div class="board-list-item">
    <div class="header">
      <div class="title">{{ boardList.title }}</div>

      <div class="delete" @click.stop="onDeleteList">X</div>
    </div>

    <div class="add-task" @click="addTask">
      <EditableText text="Add task" @change="onAddTask"/>
    </div>

    <Draggable
        class="list-group"
        :list="tasks"
        group="tasks"
        itemKey="id"
    >
      <template #item="{ element }">
        <BoardTaskItem :board-task="element"/>
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
