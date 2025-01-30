import { z } from "zod";
export declare const createProductSchema: z.ZodObject<{
    name: z.ZodString;
    price: z.ZodNumber;
    availability: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    price: number;
    availability?: boolean | undefined;
}, {
    name: string;
    price: number;
    availability?: boolean | undefined;
}>;
export declare const updateProductSchema: z.ZodObject<z.objectUtil.extendShape<Omit<{
    name: z.ZodString;
    price: z.ZodNumber;
    availability: z.ZodOptional<z.ZodBoolean>;
}, "availability">, {
    id: z.ZodNumber;
    availability: z.ZodBoolean;
}>, "strip", z.ZodTypeAny, {
    name: string;
    price: number;
    availability: boolean;
    id: number;
}, {
    name: string;
    price: number;
    availability: boolean;
    id: number;
}>;
export declare const idProductParamsSchema: z.ZodObject<{
    id: z.ZodEffects<z.ZodEffects<z.ZodString, number, string>, number, string>;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: string;
}>;
export declare const availabilityProductSchema: z.ZodObject<{
    availability: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    availability: boolean;
}, {
    availability: boolean;
}>;
