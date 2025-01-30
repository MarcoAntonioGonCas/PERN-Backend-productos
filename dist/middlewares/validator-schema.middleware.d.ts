import { RequestHandler } from 'express';
import { ZodTypeAny } from 'zod';
declare const validateRequestBody: (schema: ZodTypeAny) => RequestHandler;
declare const validateRequestParams: (schema: ZodTypeAny) => RequestHandler;
declare const validateRequestQuery: (schema: ZodTypeAny) => RequestHandler;
export { validateRequestBody, validateRequestParams, validateRequestQuery };
