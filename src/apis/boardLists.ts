import type { BoardList, BoardListCreate } from '@/models/BoardList'
import { getBaseUrl } from '@/apis/base'

export async function getByBoardId(boardId: string): Promise<BoardList[]> {
  const response = await fetch(getBaseUrl() + '/boards/' + boardId + '/lists')

  if (!response.ok) {
    return []
  }

  return response.json()
}

export async function create(boardList: BoardListCreate): Promise<BoardList | null> {
  const response = await fetch(getBaseUrl() + '/lists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(boardList)
  })

  if (!response.ok) {
    return null
  }

  return response.json()
}

export async function deleteById(id: string): Promise<BoardList | null> {
  const response = await fetch(getBaseUrl() + '/lists/' + id, {
    method: 'DELETE'
  })

  if (!response.ok) {
    return null
  }

  return response.json()
}

export async function update(id: string, index: number): Promise<BoardList | null> {
  const response = await fetch(getBaseUrl() + '/lists/' + id, {
    method: 'PATCH'
  })

  if (!response.ok) {
    return null
  }

  return response.json()
}
