import { z } from "zod";

export interface Error{
  message:string
}

export interface BaseResponse<T> {
  statusCode: number;
  message?: string;
  data?: T;
  errors?: (Error | z.ZodError)[]
}

export interface PaginatedResponse<T> {
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  totalFiltered: number;
  firstPage: number;
  lastPage: number;
  items: T[];
}