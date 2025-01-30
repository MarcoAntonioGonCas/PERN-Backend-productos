import { z } from "zod";


export const createProductSchema = z.object({
  name:z.string().nonempty(),
  price:z.number().min(1,{message:"El precio debe ser mayor a 0"}),
  availability:z.boolean().optional(),
})

export const updateProductSchema = createProductSchema.omit({availability:true}).extend({
  id:z.number(),
  availability:z.boolean(),
})

export const idProductParamsSchema = z.object({
  id: z.string()
    .transform((value) => Number(value)) // Convierte a número
    .refine((num) => num > 0, { message: "El id debe ser un número positivo" })
});

export const availabilityProductSchema = z.object({
  availability: z.boolean(),
})