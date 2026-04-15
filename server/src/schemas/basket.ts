import { Type } from '@fastify/type-provider-typebox';

export const addProductToBasketSchema = {
  body: Type.Object({
    productId: Type.Number(),
  }),
};
