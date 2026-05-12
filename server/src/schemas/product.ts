import Type from 'typebox';
import { errorResponseSchema } from './error';
import { typeResponseSchema } from './type';
import { getPaginatedResponseSchema } from './pagination-schema';

const productRequestSchema = {
  params: Type.Object({
    typeId: Type.Number(),
  }),
  querystring: Type.Object({
    page: Type.Optional(Type.Number({ default: 1, minimum: 1 })),
    limit: Type.Optional(Type.Number({ default: 10, minimum: 1, maximum: 100 })),
    search: Type.Optional(Type.String()),
    sortBy: Type.Optional(Type.String({ default: 'name' })),
    sortOrder: Type.Optional(
      Type.Union([Type.Literal('ASC'), Type.Literal('DESC')], { default: 'DESC' }),
    ),
  }),
  body: Type.Object(
    {
      name: Type.String(),
      price: Type.Number(),
      typeId: Type.Number(),
      img: Type.String(),
      sku: Type.String(),
    },
    { additionalProperties: false },
  ),
};

export const getProductRequestSchema = {
  params: productRequestSchema['params'],
  querystring: productRequestSchema['querystring'],
};

export const getProductByIdRequestSchema = {
  params: Type.Object({
    productId: Type.Number(),
  }),
};

export const addProductRequestSchema = {
  body: productRequestSchema['body'],
};

export const removeProductRequestSchema = {
  params: Type.Object({
    productId: Type.Number(),
  }),
};

export const updateProductRequestSchema = {
  params: Type.Object({
    productId: Type.Number(),
  }),
  body: productRequestSchema['body'],
};

export const productResponseSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  price: Type.Number(),
  rating: Type.Number(),
  typeId: Type.Number(),
  img: Type.String(),
  sku: Type.String(),
  type: typeResponseSchema,
});

// GET schema
export const getProductByTypeSchema = {
  tags: ['product'],
  summary: 'Получить список продуктов по типу',
  params: productRequestSchema['params'],
  querystring: productRequestSchema['querystring'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    200: getPaginatedResponseSchema(productResponseSchema),
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// GET schema
export const getAllProductSchema = {
  tags: ['product'],
  querystring: productRequestSchema['querystring'],
  summary: 'Получить список продуктов',
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    200: getPaginatedResponseSchema(productResponseSchema),
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// GET schema
export const getProductByIdSchema = {
  tags: ['product'],
  summary: 'Получить продукт по id',
  params: getProductByIdRequestSchema['params'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    200: productResponseSchema,
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// POST schema
export const postProductSchema = {
  tags: ['product'],
  summary: 'Добавить продукт',
  body: productRequestSchema['body'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    200: productResponseSchema,
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// PATCH schema
export const patchProductSchema = {
  tags: ['product'],
  summary: 'Обновить продукт',
  params: updateProductRequestSchema['params'],
  body: updateProductRequestSchema['body'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    200: productResponseSchema,
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// DELETE schema
export const deleteProductSchema = {
  tags: ['product'],
  summary: 'Удалить продукт',
  params: removeProductRequestSchema['params'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    200: Type.Null(),
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};
