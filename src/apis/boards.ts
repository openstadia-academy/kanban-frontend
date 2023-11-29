import { getBaseUrl } from '@/apis/base'
import type { Board, BoardCreate } from '@/models/Board'

export async function getById(id: string): Promise<Board | null> {
  const response = await fetch(getBaseUrl() + '/boards/' + id)

  if (!response.ok) {
    return null
  }

  return response.json()
}

export async function getAll(): Promise<Board[]> {
  const response = await fetch(getBaseUrl() + '/boards')

  if (!response.ok) {
    return []
  }

  return response.json()
}

export async function create(board: BoardCreate): Promise<Board | null> {
  const response = await fetch(getBaseUrl() + '/boards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(board)
  })

  if (!response.ok) {
    return null
  }

  return response.json()
}

export async function deleteById(id: string): Promise<Board | null> {
  const response = await fetch(getBaseUrl() + '/boards/' + id, {
    method: 'DELETE'
  })

  if (!response.ok) {
    return null
  }

  return response.json()
}
