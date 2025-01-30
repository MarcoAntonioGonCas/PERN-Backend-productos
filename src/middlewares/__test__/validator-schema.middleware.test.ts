import { validateRequestBody, validateRequestParams, validateRequestQuery } from '../validator-schema.middleware';
import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

describe('ValidatorSchemaMiddleware', () => {

  const mockRequest = (data: any, source: 'body' | 'params' | 'query') => {
    return {
      [source]: data,
    } as Request;
  };

  const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const mockNext = () => jest.fn() as NextFunction;


  it('should validate request body schema', async () => {
    const schema = z.object({
      name: z.string(),
    });
    const req = mockRequest({ name: 'John' }, 'body');
    const res = mockResponse();
    const next = mockNext();

    const middleware = validateRequestBody(schema);
    await middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should return 400 if request body schema is invalid', async () => {
    const schema = z.object({
      name: z.string(),
    });
    const req = mockRequest({ name: 123 }, 'body');
    const res = mockResponse();
    const next = mockNext();

    const middleware = validateRequestBody(schema);
    await middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid body schema',
      errors: expect.any(Array),
    });
  });

  it('should validate request params schema', async () => {
    const schema = z.object({
      id: z.string(),
    });
    const req = mockRequest({ id: '123' }, 'params');
    const res = mockResponse();
    const next = mockNext();

    const middleware = validateRequestParams(schema);
    await middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should return 400 if request params schema is invalid', async () => {
    const schema = z.object({
      id: z.string(),
    });
    const req = mockRequest({ id: 123 }, 'params');
    const res = mockResponse();
    const next = mockNext();

    const middleware = validateRequestParams(schema);
    await middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid params schema',
      errors: expect.any(Array),
    });
  });

  it('should validate request query schema', async () => {
    const schema = z.object({
      search: z.string(),
    });
    const req = mockRequest({ search: 'test' }, 'query');
    const res = mockResponse();
    const next = mockNext();

    const middleware = validateRequestQuery(schema);
    await middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should return 400 if request query schema is invalid', async () => {
    const schema = z.object({
      search: z.string(),
    });
    const req = mockRequest({ search: 123 }, 'query');
    const res = mockResponse();
    const next = mockNext();

    const middleware = validateRequestQuery(schema);
    await middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid query schema',
      errors: expect.any(Array),
    });
  });

});