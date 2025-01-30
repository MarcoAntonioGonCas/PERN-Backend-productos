import type { Request, Response } from 'express';
import { availabilityProductSchema, createProductSchema, idProductParamsSchema, updateProductSchema } from '../schemas/product.schema';
import db from '../config/db';
import Product from '../entities/Product';
import { BaseResponse, PaginatedResponse } from '../types/response/baseReponse';
import { paginationRequestSchema } from '../schemas/pagination.schema';
import { calculateFirstAndLastPage, calculatePage } from '../utils/pageUtils';
import { showInfo } from '../utils/consoleUtil';
import { Op } from 'sequelize';
import { trimObject } from '../utils/objectUtil';


export const getProductsPaginated = async (req: Request, res: Response):Promise<void> => {
  const {
    pageIndex,
    pageSize,
    order = [],
    search = []
  } = paginationRequestSchema.parse(req.query);

  const permitedFieldsOrderSearch = [
    'name',
    'price',
    'availability',
    'createdAt',
  ];
  const {offset, limit} = calculatePage(pageIndex, pageSize);
    
  const whereFilter = search.filter((s) => permitedFieldsOrderSearch.includes(s.column))
    .map((s) => ({[s.column]: {[Op.substring]: s.value}}));

  const orderQuery = order.filter((o) => permitedFieldsOrderSearch.includes(o.column))

  showInfo('whereFilter', whereFilter);


  const productsFilter = await Product.findAll({
    limit,
    offset,
    order: orderQuery.length > 0 ? 
      orderQuery.map(o => [o.column,o.dir]) : 
      ['createdAt'],
    where: whereFilter
  })
  const totalItems = await Product.count();
  const totalItemsFiltered = productsFilter.length;
  const {totalPages, firstPage, lastPage} = calculateFirstAndLastPage(totalItems, pageSize);

  const response:BaseResponse< 
    PaginatedResponse<Product>
  > = {
    statusCode: 200,
    data: {
      pageIndex,
      pageSize,
      totalItems,
      totalFiltered: totalItemsFiltered,
      totalPages,
      firstPage,
      lastPage,
      items: productsFilter
    }
  }

  res.json(response);
}

export const getProducts = async (req: Request, res: Response):Promise<void> => {
  try{
    const products = await Product.findAll();
    const response : BaseResponse<Product[]> = {
      statusCode: 200,
      data: products
    }
    res.json(response);
  }catch{
    const resp: BaseResponse<null> = {
      statusCode: 500,
      message: 'Internal server error',
    }
    res.status(500).json(resp);
  }
}

export const createProduct = async (req: Request, res: Response):Promise<void> => {
  try{
    let product = createProductSchema.parse(req.body);
    product = trimObject(product);
    const productModel = new Product(product);

    const resp = await productModel.save();

    const response: BaseResponse<Product> = {
      statusCode: 201,
      data: resp
    }

    res.status(201).json(response);
  }catch{
    const resp: BaseResponse<null> = {
      statusCode: 500,
      message: 'Internal server error',
    }
    res.status(500).json(resp);
  }
}

export const getProductById = async (req: Request, res: Response):Promise<void> => {
  try{
    
    const {id} = idProductParamsSchema.parse(req.params);

    const product = await Product.findOne({
      where:{
        id:id
      }
    });

    if(!product){
      res.status(404).json({
        message: 'Product not found',
        statusCode: 404
      } as BaseResponse<null>);
      return;
    }

    const response: BaseResponse<Product> = {
      statusCode: 200,
      data: product
    }

    res.json(response);

  }catch{
    const resp: BaseResponse<null> = {
      statusCode: 500,
      message: 'Internal server error',
    }
    res.status(500).json(resp);
  }
}

export const updateProduct = async (req: Request, res: Response):Promise<void> => {
  try{
    const {id} = idProductParamsSchema.parse(req.params);
    let product = updateProductSchema.parse(req.body);
    product = trimObject(product);
    if(id !== product.id){
      res.status(400).json({
        errors:[
          {
            message:'The id in the params does not match the id in the body'
          }
        ]
      });
      return;
    }

    const exists = await Product.findOne({
      where:{
        id:id
      }
    })

    if(!exists){
      res.status(404).json({
        message: 'El producto no existe',
        statusCode: 404
      } as BaseResponse<null>);
      return;
    }

    await exists.update(product);

    const response: BaseResponse<Product> = {
      statusCode: 200,
      data: exists
    }

    res.json(response);

  }catch{
    const resp: BaseResponse<null> = {
      statusCode: 500,
      message: 'Internal server error',
    }
    res.status(500).json(resp);
  }
}

export const patchProductAvailability = async (req: Request, res: Response):Promise<void> => {
  try{
    const {id} = idProductParamsSchema.parse(req.params);
    const {availability} = availabilityProductSchema.parse(req.body);

    const exists = await Product.findByPk(id);


    if(!exists){
      res.status(404).json({
        message: 'El producto no existe',
        statusCode: 404
      } as BaseResponse<null>);
      return;
    }

    await exists.update({
      availability
    });


    const response: BaseResponse<Product> = {
      statusCode: 200,
      data: exists
    }

    res.json(response);

  }catch{
    const resp: BaseResponse<null> = {
      statusCode: 500,
      message: 'Internal server error',
    }
    res.status(500).json(resp);
  }
} 

export const deleteProduct = async (req: Request, res: Response):Promise<void> => {
  try{
    const {id} = idProductParamsSchema.parse(req.params);

    const exists = await Product.findByPk(id);

    if(!exists){
      res.status(404).json({
        message: 'El producto no existe',
      });
      return;
    }

    await exists.destroy();

    const response: BaseResponse<Product> = {
      statusCode: 200,
      data: exists
    }

    res.json(response);

  }catch{
    const resp: BaseResponse<null> = {
      statusCode: 500,
      message: 'Internal server error',
    }
    res.status(500).json(resp);
  }
}