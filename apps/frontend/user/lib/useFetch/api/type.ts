export interface PaginationResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export interface PaginationQuery {
  page?: number
  limit?: number
  search?: number
}