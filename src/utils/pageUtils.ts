import { PageOffsetLimit, PaginationBounds  } from "../types/pageUtil.types";

export const calculatePage = (pageIndex: number, pageSize: number) : PageOffsetLimit => {
  const offset = (pageIndex - 1) * pageSize;
  const limit = pageSize;
  return { offset, limit };
}

export const calculateFirstAndLastPage = (totalItems: number, pageSize: number) : PaginationBounds => {
  // Math.ceil() devuelve el entero mayor o igual más cercano a un número dado.
  const totalPages = Math.ceil(totalItems / pageSize);
  const firstPage = 1;
  const lastPage = totalPages;
  return { totalPages, firstPage, lastPage };
}