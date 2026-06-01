import { Type } from '@fastify/type-provider-typebox';
import { errorResponseSchema } from './error';
import { productResponseSchema } from './product';
import { getPaginatedResponseSchema } from './pagination-schema';

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

export const ResponseProductInfoSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  description: Type.String(),
  productId: Type.Number(),
  product: Type.Optional(Type.Omit(productResponseSchema, ['type'])),
});

export const QuerystringProductListSchema = Type.Object({
  page: Type.Optional(Type.Number({ default: 1, minimum: 1 })),
  limit: Type.Optional(Type.Number({ default: 10, minimum: 1, maximum: 100 })),
  search: Type.Optional(Type.String()),
});

// GET schema
export const getProductInfoListByIdSchema = {
  tags: ['productInfo'],
  summary: 'Получить информацию о продукте',
  params: getProductInfoListRequestSchema['params'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    200: Type.Array(ResponseProductInfoSchema),
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// GET schema
export const getAllProductInfoListSchema = {
  tags: ['productInfo'],
  summary: 'Получить список информации о продуктах',
  querystring: QuerystringProductListSchema,
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    200: getPaginatedResponseSchema(ResponseProductInfoSchema),
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
    201: ResponseProductInfoSchema,
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
    200: ResponseProductInfoSchema,
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
