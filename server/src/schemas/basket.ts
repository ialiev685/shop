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
