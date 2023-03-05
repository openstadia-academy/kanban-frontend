<script setup lang="ts">
import Draggable from "vuedraggable"
import EditableText from "@/components/EditableText.vue";
import BoardListItem from "@/components/BoardListItem.vue";
import {boardListService} from "@/services/BoardListService";
import {boardService} from "@/services/BoardService";

const props = defineProps<{
  id: string
}>()

const board = boardService.getById(props.id)
const lists = boardListService.getByBoardId(props.id)

const onAddList = (value: string) => {
  boardListService.create({
    title: value,
    board_id: props.id
  })
}

</script>

<template>
  <div class="board-view">
    <div v-if="board" class="title"> {{ board.title }}</div>

    <div class="lists_wrapper">
      <Draggable
          class="lists"
          :list="lists"
          group="lists"
          itemKey="id"
      >
        <template #item="{ element }">
          <BoardListItem class="list-item" :board-list="element"/>
        </template>
      </Draggable>

      <div class="add-list">
        <EditableText text="Add List" @change="onAddList"/>
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
