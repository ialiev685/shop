import Type from 'typebox';
import { errorResponseSchema } from './error';

export const productRequestSchema = {
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

export const removeProductRequestSchema = {
  params: Type.Object({
    productId: Type.Number(),
  }),
};

export const updateProductRequestSchema = {
  params: Type.Object({
    productId: Type.Number(),
  }),
  body: Type.Object(
    {
      name: Type.Optional(Type.String()),
      price: Type.Optional(Type.Number()),
      typeId: Type.Optional(Type.Number()),
      img: Type.Optional(Type.String()),
      sku: Type.Optional(Type.String()),
    },
    { additionalProperties: false },
  ),
};

export const getProductListRequestSchema = {
  params: Type.Object({
    typeId: Type.Number(),
  }),
};

const productResponseSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  price: Type.Number(),
  rating: Type.Number(),
  typeId: Type.Number(),
  img: Type.String(),
  sku: Type.String(),
});

// GET schema
export const getProductSchema = {
  tags: ['product'],
  summary: 'Получить продукты по типу',
  params: getProductListRequestSchema['params'],
  response: {
    200: Type.Array(productResponseSchema),
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// POST schema
export const postProductSchema = {
  tags: ['product'],
  summary: 'Добавить продукта',
  body: productRequestSchema['body'],
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
  response: {
    200: Type.Null(),
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};
