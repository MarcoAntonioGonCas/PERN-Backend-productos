import { z } from "zod";
export declare const searchRequestSchema: z.ZodObject<{
    column: z.ZodString;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string;
    column: string;
}, {
    value: string;
    column: string;
}>;
export declare const orderRequestSchema: z.ZodObject<{
    column: z.ZodString;
    dir: z.ZodEnum<["ASC", "DESC"]>;
}, "strip", z.ZodTypeAny, {
    column: string;
    dir: "ASC" | "DESC";
}, {
    column: string;
    dir: "ASC" | "DESC";
}>;
export declare const paginationRequestSchema: z.ZodObject<{
    pageIndex: z.ZodNumber;
    pageSize: z.ZodNumber;
    search: z.ZodOptional<z.ZodArray<z.ZodObject<{
        column: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        column: string;
    }, {
        value: string;
        column: string;
    }>, "many">>;
    order: z.ZodOptional<z.ZodArray<z.ZodObject<{
        column: z.ZodString;
        dir: z.ZodEnum<["ASC", "DESC"]>;
    }, "strip", z.ZodTypeAny, {
        column: string;
        dir: "ASC" | "DESC";
    }, {
        column: string;
        dir: "ASC" | "DESC";
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    pageIndex: number;
    pageSize: number;
    search?: {
        value: string;
        column: string;
    }[] | undefined;
    order?: {
        column: string;
        dir: "ASC" | "DESC";
    }[] | undefined;
}, {
    pageIndex: number;
    pageSize: number;
    search?: {
        value: string;
        column: string;
    }[] | undefined;
    order?: {
        column: string;
        dir: "ASC" | "DESC";
    }[] | undefined;
}>;
