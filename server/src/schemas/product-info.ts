import { Type } from '@fastify/type-provider-typebox';

export const productInfoSchema = {
  body: Type.Object({
    name: Type.String(),
    description: Type.String(),
    productId: Type.Number(),
  }),
};

export const removeProductInfoSchema = {
  params: Type.Object({
    productInfoId: Type.Number(),
  }),
};

export const updateProductInfoSchema = {
  params: Type.Object({ productInfoId: Type.Number() }),
  body: Type.Object({
    name: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
  }),
};

export const getProductInfoListSchema = {
  params: Type.Object({
    productId: Type.Number(),
  }),
};

const errorResponseSchema = Type.Object({
  error: Type.Optional(Type.String()),
  message: Type.String(),
});

const productInfoResponseSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  description: Type.String(),
  productId: Type.Number(),
});

// GET schema
export const getProductInfoSchema = {
  tags: ['productInfo'],
  summary: 'Получить характеристики продукта',
  params: getProductInfoListSchema['params'],
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
  body: productInfoSchema['body'],
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
  params: updateProductInfoSchema['params'],
  body: updateProductInfoSchema['body'],
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
  params: removeProductInfoSchema['params'],
  response: {
    200: Type.Null(),
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};
