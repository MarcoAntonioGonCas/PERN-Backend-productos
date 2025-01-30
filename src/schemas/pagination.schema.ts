import { z } from "zod";



export const searchRequestSchema = z.object({
  column: z.string().nonempty(),
  value: z.string().nonempty(),
})

export const orderRequestSchema = z.object({
  column: z.string().nonempty(),
  dir: z.enum(['ASC', 'DESC'])
})

export const paginationRequestSchema = z.object({
  pageIndex: z.coerce.number().int().positive(),
  pageSize: z.coerce.number().int().positive(),
  search: z.array(searchRequestSchema).optional(),
  order: z.array(orderRequestSchema).optional()  
})