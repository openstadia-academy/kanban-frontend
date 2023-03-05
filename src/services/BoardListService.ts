import type { Ref } from 'vue'
import { ref, toRef } from 'vue'
import type { BoardList, BoardListCreate } from '@/models/BoardList'

const BASE_API_URL = 'http://localhost:8000/api'

const lists: Ref<{
  [boardId: string]: BoardList[]
}> = ref({})
export const boardListService = {
  getByBoardId(boardId: string): Ref<BoardList[]> {
    lists.value[boardId] = []
    const currentLists = toRef(lists.value, boardId)

    ;(async () => {
      const response = await fetch(BASE_API_URL + '/boards/' + boardId + '/lists')

      if (response.ok) {
        currentLists.value = await response.json()
      }
    })()
    return currentLists
  },
  create(boardList: BoardListCreate): void {
    ;(async () => {
      const response = await fetch(BASE_API_URL + '/lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(boardList)
      })

      if (response.ok) {
        const list = await response.json()
        lists.value[list.board_id].push(list)
      }
    })()
  },
  deleteById(id: string): void {
    ;(async () => {
      const response = await fetch(BASE_API_URL + '/lists/' + id, {
        method: 'DELETE'
      })

      if (response.ok) {
        const list = await response.json()
        lists.value[list.board_id] = lists.value[list.board_id].filter((l) => l.id != list.id)
      }
    })()
  }
}
