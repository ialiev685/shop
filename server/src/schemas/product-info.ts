import { Type } from '@fastify/type-provider-typebox';

export const productInfoSchemaBody = {
  body: Type.Object({
    name: Type.String(),
    description: Type.String(),
    productId: Type.Number(),
  }),
};
