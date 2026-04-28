import { Type } from '@fastify/type-provider-typebox';
import { errorResponseSchema } from './error';

export const productInfoRequestSchema = {
  body: Type.Object({
    name: Type.String(),
    description: Type.String(),
    productId: Type.Number(),
  }),
};

export const removeProductInfoRequestSchema = {
  params: Type.Object({
    productInfoId: Type.Number(),
  }),
};

export const updateProductInfoRequestSchema = {
  params: Type.Object({ productInfoId: Type.Number() }),
  body: Type.Object({
    name: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
  }),
};

export const getProductInfoListRequestSchema = {
  params: Type.Object({
    productId: Type.Number(),
  }),
};

const productInfoResponseSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  description: Type.String(),
  productId: Type.Number(),
});

// GET schema
export const getProductInfoSchema = {
  tags: ['productInfo'],
  summary: 'Получить информацию о продукте',
  params: getProductInfoListRequestSchema['params'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    200: Type.Array(productInfoResponseSchema),
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// POST schema
export const postProductInfoSchema = {
  tags: ['productInfo'],
  summary: 'Добавить информацию о продукте',
  body: productInfoRequestSchema['body'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    201: productInfoResponseSchema,
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// PATCH Schema
export const patchProductSchema = {
  tags: ['productInfo'],
  summary: 'Обновить информацию о продукте',
  params: updateProductInfoRequestSchema['params'],
  body: updateProductInfoRequestSchema['body'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    200: productInfoResponseSchema,
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// DELETE Schema
export const deleteProductSchema = {
  tags: ['productInfo'],
  summary: 'Удалить информацию о продукте',
  params: removeProductInfoRequestSchema['params'],
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
