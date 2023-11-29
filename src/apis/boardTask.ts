import { getBaseUrl } from '@/apis/base'
import type { BoardTask, BoardTaskCreate } from '@/models/BoardTask'

export async function getByListId(listId: string): Promise<BoardTask[]> {
  const response = await fetch(getBaseUrl() + '/lists/' + listId + '/tasks')

  if (!response.ok) {
    return []
  }

  return response.json()
}

export async function create(task: BoardTaskCreate): Promise<BoardTask | null> {
  const response = await fetch(getBaseUrl() + '/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  if (!response.ok) {
    return null
  }

  return response.json()
}

export async function deleteById(id: string): Promise<BoardTask | null> {
  const response = await fetch(getBaseUrl() + '/tasks/' + id, {
    method: 'DELETE'
  })

  if (!response.ok) {
    return null
  }

  return response.json()
}
