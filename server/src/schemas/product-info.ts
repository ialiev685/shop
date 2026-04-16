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
