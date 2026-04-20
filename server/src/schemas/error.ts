import { Type } from '@fastify/type-provider-typebox';

export const errorResponseSchema = Type.Object({
  error: Type.Optional(Type.String()),
  message: Type.String(),
});
