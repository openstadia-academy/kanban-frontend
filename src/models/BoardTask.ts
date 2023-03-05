export interface BoardTask {
  id: string
  title: string
  description?: string
  index: number
  list_id: string
}

export interface BoardTaskCreate {
  title: string
  description?: string
  index: number
  list_id: string
}
