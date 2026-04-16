import { Type } from '@fastify/type-provider-typebox';

export const productInfoSchemaBody = {
  body: Type.Object({
    name: Type.String(),
    description: Type.String(),
    productId: Type.Number(),
  }),
};

export const removeProductInfoSchemaBody = {
  body: Type.Object({
    productInfoId: Type.Number(),
  }),
};

export const updateProductInfoSchemaBody = {
  body: Type.Object({
    name: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    productInfoId: Type.Number(),
  }),
};

export const getProductInfoListSchemaBody = {
  params: Type.Object({
    productId: Type.Number(),
  }),
};
