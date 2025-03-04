import { Router } from 'express'
import { validateRequestBody, validateRequestParams, validateRequestQuery } from '../middlewares/validator-schema.middleware';
import { availabilityProductSchema, createProductSchema, idProductParamsSchema, updateProductSchema } from '../schemas/product.schema';
import { createProduct, getProducts, getProductById, updateProduct, patchProductAvailability, getProductsPaginated, deleteProduct } from '../controllers/products'
import { paginationRequestSchema } from '../schemas/pagination.schema';





const router = Router();

/**
 * @swagger
 * components:
 *  parameters:
 *    PageIndex:
 *      name: pageIndex
 *      in: query
 *      schema:
 *        type: integer
 *        minimum: 1
 *      required: true
 *      description: El índice de la página (comenzando desde 1)
 *    PageSize:
 *      name: pageSize
 *      in: query
 *      schema:
 *        type: integer
 *        minimum: 1
 *      required: true
 *      description: El número de elementos por página
 *    Search:
 *      name: search
 *      in: query
 *      schema:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            column:
 *              type: string
 *              description: La columna en la que buscar
 *            value:
 *              type: string
 *              description: El valor a buscar
 *     
 *      description: Criterios de búsqueda
 *    Order:
 *     name: order
 *     in: query   
 *     schema:
 *      type: array
 *      items:
 *        type: object
 *        properties:
 *          column:
 *            type: string
 *            description: The column to order by
 *            example: "name"
 *          dir: 
 *           type: string
 *           enum: ["ASC", "DESC"] 
 *           description: The direction of the order
 * 
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the product
 *          example: 1
 *        name:
 *          type: string
 *          description: The name of the product
 *          example: "Coca Cola"
 *        price:
 *          type: float
 *          description: The price of the product
 *          example: 1.5
 *        image:
 *          type: string
 *          description: The image of the product
 *        availability:
 *          type: boolean
 *          description: The availability of the product
 *          example: true
 *    ErrorResponse:
 *     type: object
 *     properties:
 *      message:
 *        type: string
 *        description: The error message
 *    BaseResponseWithoutData:
 *     type: object
 *     properties:
 *      statusCode:
 *        type: number
 *        description: The status code of the response
 *        example: "200 | 400 | 404 | 500"
 *      message:
 *        type: string
 *        description: The message of the response
 *        example: "Success | null"
 *      errors:
 *       type: array
 *       items: 
 *        $ref: '#/components/schemas/ErrorResponse'
 */


/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get all products
 *    tags: [Products]
 *    description: Get all products from the database
 *    responses:
 *      200:
 *        description: The list of products
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *               - $ref: '#/components/schemas/BaseResponseWithoutData'
 *               - type: object
 *                 properties:
 *                  data:
 *                    type: array
 *                    items:  
 *                       $ref: '#/components/schemas/Product'
 * 
 *      500:
 *        description: Internal Server Error
 */

router.get('/', getProducts);



/**
 * @swagger
 * /api/products/list:
 *  get:
 *    summary: Get paginated products
 *    tags: [Products]
 *    description: Get a paginated list of products from the database
 *    parameters:
 *      - $ref: '#/components/parameters/PageIndex'
 *      - $ref: '#/components/parameters/PageSize'
 *      - $ref: '#/components/parameters/Search'
 *      - $ref: '#/components/parameters/Order'
 *    responses:
 *      "200":
 *        description: A paginated list of products
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *                - $ref: '#/components/schemas/BaseResponseWithoutData'
 *                - type: object
 *                  properties:
 *                    data:
 *                      type: object
 *                      properties: 
 *                        pageIndex:
 *                          type: number         
 *                        pageSize:
 *                          type: number     
 *                        totalPages:
 *                          type: number
 *                        totalItems:
 *                          type: number
 *                        totalFiltered:      
 *                          type: number
 *                        items:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Product'
 *      "404":
 *        description: Bad Request (invalid query parameters)
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BaseResponseWithoutData'
 *      "500":
 *        description: Internal Server Error
 */

router.get("/list",
  validateRequestQuery(paginationRequestSchema),
  getProductsPaginated
)


/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by id
 *    tags: [Products]
 *    description: Get a product by its id
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: The id of the product
 *    responses:
 *      200:
 *        description: The product
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *               - $ref: '#/components/schemas/BaseResponseWithoutData'
 *               - type: object
 *                 properties:
 *                  data:
 *                    $ref: '#/components/schemas/Product'
 *      404:
 *        description: Product not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BaseResponseWithoutData'
 *      500:
 *        description: Internal Server Error
 */
router.get('/:id', 
  validateRequestParams(idProductParamsSchema), 
  getProductById
);


/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Create a product
 *    tags: [Products]
 *    description: Create a new product
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *             name:
 *               type: string
 *               description: The name of the product
 *               example: Coca Cola 3.5L
 *             price:
 *               type: number
 *               description: The price of the product
 *               example: 50
 *             image:
 *               type: string
 *               description: The image of the product
 *               nullable: true
 *             availability:
 *               type: boolean
 *               description: The availability of the product
 *               example: true
 *    responses:
 *      201:
 *        description: The product was created
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *               - $ref: '#/components/schemas/BaseResponseWithoutData'
 *               - type: object
 *                 properties:
 *                  data:
 *                    $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request (invalid request body)
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BaseResponseWithoutData'
 *      500:
 *        description: Internal Server Error
 */
router.post('/', 
  validateRequestBody(createProductSchema), 
  createProduct
);


/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Update a product
 *    tags: [Products]
 *    description: Update a product by its id
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: The id of the product
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *             id:
 *              type: number
 *              description: The id of the product
 *              example: 1
 *             name:
 *               type: string
 *               description: The name of the product
 *               example: Coca Cola 3.5L
 *             price:
 *               type: number
 *               description: The price of the product
 *               example: 50
 *             image:
 *               type: string
 *               description: The image of the product
 *               nullable: true
 *             availability:
 *               type: boolean
 *               description: The availability of the product
 *               example: true
 *    responses:
 *      200:
 *        description: The product was updated
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *               - $ref: '#/components/schemas/BaseResponseWithoutData'
 *               - type: object
 *                 properties:
 *                  data:
 *                    $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request (invalid request body)
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BaseResponseWithoutData'
 *      404:
 *        description: Product not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BaseResponseWithoutData'
 *      500:
 *        description: Internal Server Error
 */
router.put('/:id', 
  validateRequestParams(idProductParamsSchema), 
  validateRequestBody(updateProductSchema), 
  updateProduct
);


/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update the availability of a product
 *    tags: [Products]
 *    description: Update the availability of a product by its id
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: The id of the product
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *             availability:
 *               type: boolean
 *               description: The availability of the product
 *               example: true
 *    responses:
 *      200:
 *        description: The availability of the product was updated
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *               - $ref: '#/components/schemas/BaseResponseWithoutData'
 *               - type: object
 *                 properties:
 *                  data:
 *                    $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request (invalid request body)
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BaseResponseWithoutData'
 *      404:
 *        description: Product not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BaseResponseWithoutData'
 *      500:
 *        description: Internal Server Error
 */
router.patch('/:id', 
  validateRequestParams(idProductParamsSchema), 
  validateRequestBody(availabilityProductSchema), 
  patchProductAvailability
);


/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *   summary: Delete a product
 *   tags: [Products]
 *   description: Delete a product by its id
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       schema:
 *        type: string
 *       description: The id of the product
 *   responses:
 *     200:
 *       description: Product not found
 *       content:
 *         application/json:
 *          schema:
 *           allOf: 
 *              - $ref: '#/components/schemas/BaseResponseWithoutData'
 *              - type: object
 *                properties:
 *                 data:
 *                  $ref: '#/components/schemas/Product'
 *     404:
 *       description: Product not found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BaseResponseWithoutData'
 *     500:
 *       description: Internal Server Error
 */
router.delete('/:id',
  validateRequestParams(idProductParamsSchema),
  deleteProduct
);

export default router;