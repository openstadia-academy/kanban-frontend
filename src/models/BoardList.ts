export interface BoardListBase {
  title: string
  board_id: string
  index: number
}

export interface BoardList extends BoardListBase {
  id: string
}

export interface BoardListCreate extends BoardListBase {}
