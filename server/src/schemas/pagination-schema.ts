import { type TSchema, Type } from '@fastify/type-provider-typebox';

const paginationMetaSchema = Type.Object({
  total: Type.Number(),
  page: Type.Number(),
  limit: Type.Number(),
  totalPages: Type.Number(),
  hasNextPage: Type.Boolean(),
  hasPrevPage: Type.Boolean(),
});

export const getPaginatedResponseSchema = <T extends TSchema>(dataSchema: T) => {
  return Type.Object({
    data: Type.Array(dataSchema),
    pagination: paginationMetaSchema,
  });
};
