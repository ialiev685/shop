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
    quantity: Type.Number({ minimum: 1 }),
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

const ErrorResponseSchema = Type.Object({
  error: Type.String(),
  message: Type.String(),
});

// GET schema
const BasketProductItemResponseSchema = Type.Object({
  id: Type.Number(),
  basketId: Type.Number(),
  productId: Type.Number(),
  quantity: Type.Number(),
  product: Type.Object({
    id: Type.Number(),
    name: Type.String(),
    price: Type.Number(),
    img: Type.String(),
    sku: Type.String(),
    rating: Type.Number(),
  }),
});

const BasketResponseSchema = Type.Object({
  id: Type.Number(),
  userId: Type.Number(),
  basketProducts: Type.Array(BasketProductItemResponseSchema),
});

export const getBasketSchema = {
  tags: ['basket'],
  summary: 'Получить корзину пользователя',
  response: {
    200: BasketResponseSchema,
    500: ErrorResponseSchema,
  },
};

// POST schema
const basketProductResponseSchema = Type.Object({
  id: Type.Number(),
  basketId: Type.Number(),
  productId: Type.Number(),
  quantity: Type.Number(),
});

export const postAddSchema = {
  tags: ['basket'],
  summary: 'Добавить продукт в корзину',
  body: addProductToBasketRequestSchema['body'],
  response: {
    200: basketProductResponseSchema,
    400: ErrorResponseSchema,
    500: ErrorResponseSchema,
  },
};
