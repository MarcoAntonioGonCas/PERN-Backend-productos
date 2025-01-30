import { PageOffsetLimit, PaginationBounds } from "../types/pageUtil.types";
export declare const calculatePage: (pageIndex: number, pageSize: number) => PageOffsetLimit;
export declare const calculateFirstAndLastPage: (totalItems: number, pageSize: number) => PaginationBounds;
