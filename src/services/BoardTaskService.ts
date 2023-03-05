import type { Ref } from 'vue'
import { ref, toRef } from 'vue'
import type { BoardTask, BoardTaskCreate } from '@/models/BoardTask'

const BASE_API_URL = 'http://localhost:8000/api'

const tasks: Ref<{
  [listId: string]: BoardTask[]
}> = ref({})
export const boardTaskService = {
  getByListId(listId: string): Ref<BoardTask[]> {
    tasks.value[listId] = []
    const currentTasks = toRef(tasks.value, listId)

    ;(async () => {
      const response = await fetch(BASE_API_URL + '/lists/' + listId + '/tasks')

      if (response.ok) {
        currentTasks.value = await response.json()
      }
    })()

    return currentTasks
  },
  create(boardTask: BoardTaskCreate): void {
    ;(async () => {
      const response = await fetch(BASE_API_URL + '/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(boardTask)
      })

      if (response.ok) {
        const task = await response.json()
        tasks.value[boardTask.list_id].push(task)
      }
    })()
  },
  deleteById(id: string): void {
    ;(async () => {
      const response = await fetch(BASE_API_URL + '/tasks/' + id, {
        method: 'DELETE'
      })

      if (response.ok) {
        const task = await response.json()
        tasks.value[task.list_id] = tasks.value[task.list_id].filter((t) => t.id != task.id)
      }
    })()
  }
}
