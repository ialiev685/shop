import { Type } from '@fastify/type-provider-typebox';

export const addProductToBasketSchema = {
  body: Type.Object({
    productId: Type.Number(),
  }),
};

export const updateQuantityProductSchema = {
  body: Type.Object({
    basketId: Type.Number(),
    productId: Type.Number(),
    quantity: Type.Number({ minimum: 1 }),
  }),
};

export const removeProductFromBasketSchema = {
  body: Type.Object({
    basketId: Type.Number(),
    productId: Type.Number(),
  }),
};

export const clearBasketSchema = {
  body: Type.Object({
    basketId: Type.Number(),
  }),
};

export const ErrorResponse = Type.Object({
  error: Type.String(),
  message: Type.String(),
});

export const BasketProductItem = Type.Object({
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

export const BasketResponse = Type.Object({
  id: Type.Number(),
  userId: Type.Number(),
  basketProducts: Type.Array(BasketProductItem),
});

export const getSchema = {
  tags: ['basket'],
  summary: 'Получить корзину пользователя',
  response: {
    200: BasketResponse,
    500: ErrorResponse,
  },
};
