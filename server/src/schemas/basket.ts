import { Type } from '@fastify/type-provider-typebox';

export const addProductToBasketRequestSchema = {
  body: Type.Object({
    productId: Type.Number(),
  }),
};

export const updateQuantityProductRequestSchema = {
  body: Type.Object({
    basketId: Type.Number(),
    productId: Type.Number(),
    quantity: Type.Number({ minimum: 1, maximum: 999 }),
  }),
};

export const removeProductFromBasketRequestSchema = {
  body: Type.Object({
    basketId: Type.Number(),
    productId: Type.Number(),
  }),
};

export const clearBasketRequestSchema = {
  body: Type.Object({
    basketId: Type.Number(),
  }),
};

const errorResponseSchema = Type.Object({
  error: Type.String(),
  message: Type.String(),
});

const productResponseSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  price: Type.Number(),
  img: Type.String(),
  sku: Type.String(),
  rating: Type.Number(),
});

const basketProductItemResponseSchema = Type.Object({
  id: Type.Number(),
  basketId: Type.Number(),
  productId: Type.Number(),
  quantity: Type.Number(),
  product: productResponseSchema,
});

// GET schema
const basketResponseSchema = Type.Object({
  id: Type.Number(),
  userId: Type.Number(),
  basketProducts: Type.Array(basketProductItemResponseSchema),
});

export const getBasketSchema = {
  tags: ['basket'],
  summary: 'Получить корзину пользователя',
  response: {
    200: basketResponseSchema,
    500: errorResponseSchema,
  },
};

// POST ADD schema
export const postAddSchema = {
  tags: ['basket'],
  summary: 'Добавить продукт в корзину',
  body: addProductToBasketRequestSchema['body'],
  response: {
    200: basketProductItemResponseSchema,
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// POST Update schema
export const postUpdateSchema = {
  tags: ['basket'],
  summary: 'Обновить количество продукта в корзине',
  body: updateQuantityProductRequestSchema['body'],
  response: {
    200: basketProductItemResponseSchema,
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// POST Remove schema
export const postRemoveSchema = {
  tags: ['basket'],
  summary: 'Удалить продукт из корзины',
  body: removeProductFromBasketRequestSchema['body'],
  response: {
    200: Type.Null(),
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// POST Clear schema
export const postClearSchema = {
  tags: ['basket'],
  summary: 'Очистить корзину',
  body: clearBasketRequestSchema['body'],
  response: {
    200: Type.Null(),
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};
