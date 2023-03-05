import type { Ref } from 'vue'
import { ref } from 'vue'
import type { Board, BoardCreate } from '@/models/Board'

const BASE_API_URL = 'http://localhost:8000/api'

const boards: Ref<Board[]> = ref([])

export const boardService = {
  getAll(): Ref<Board[]> {
    ;(async () => {
      const response = await fetch(BASE_API_URL + '/boards')

      if (response.ok) {
        boards.value = await response.json()
      }
    })()
    return boards
  },
  getById(id: string): Ref<Board | null> {
    const board: Ref<Board | null> = ref(null)

    ;(async () => {
      const response = await fetch(BASE_API_URL + '/boards/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        board.value = await response.json()
      }
    })()

    return board
  },
  create(board: BoardCreate): void {
    ;(async () => {
      const response = await fetch(BASE_API_URL + '/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(board)
      })

      if (response.ok) {
        const board = await response.json()
        boards.value.push(board)
      }
    })()
  },
  deleteById(id: string): void {
    ;(async () => {
      const response = await fetch(BASE_API_URL + '/boards/' + id, {
        method: 'DELETE'
      })

      if (response.ok) {
        boards.value = boards.value.filter((b) => b.id != id)
      }
    })()
  }
}
