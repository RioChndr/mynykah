import { PipeTransform } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class PaginationQuery {
  @ApiProperty({ required: false })
  page?: number;
  @ApiProperty({ required: false })
  limit?: number;
  @ApiProperty({ required: false })
  search?: string
}

export class PaginationQueryPipe implements PipeTransform {
  transform(value: PaginationQuery) {
    return {
      page: value.page || 1,
      limit: value.limit || 10,
      search: value.search || ""
    }
  }
}

export function PaginationDb(pagination: PaginationQuery) {
  return {
    skip: (pagination.page - 1) * pagination.limit,
    take: +pagination.limit
  }
}

export class PaginationResponse<T = any> {
  constructor(paginate: PaginationQuery, data: T[], total: number) {
    this.data = data;
    this.page = paginate.page || 1;
    this.limit = paginate.limit || 10;
    this.total = total;
  }

  total: number;
  page: number;
  limit: number;
  data: T[];
}