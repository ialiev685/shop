import Type from 'typebox';
import { errorResponseSchema } from './error';

const typeRequestSchema = {
  querystring: Type.Object({
    search: Type.Optional(Type.String()),
  }),
  body: Type.Object({
    name: Type.String(),
  }),
  params: Type.Object({
    typeId: Type.Number(),
  }),
};

export const addTypeRequestSchema = {
  body: typeRequestSchema['body'],
};

export const getTypeRequestSchema = {
  querystring: typeRequestSchema['querystring'],
};

export const updateTypeRequestSchema = {
  params: typeRequestSchema['params'],
  body: typeRequestSchema['body'],
};

export const removeTypeRequestSchema = {
  params: typeRequestSchema['params'],
};

export const typeResponseSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
});

// GET schema
export const getTypeSchema = {
  tags: ['type'],
  summary: 'Получить типы',
  querystring: getTypeRequestSchema['querystring'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    200: Type.Array(typeResponseSchema),
    500: errorResponseSchema,
  },
};

// POST Schema
export const postTypeSchema = {
  tags: ['type'],
  summary: 'Добавить тип',
  body: typeRequestSchema['body'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    200: typeResponseSchema,
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// PATCH Schema
export const patchTypeSchema = {
  tags: ['type'],
  summary: 'Обновить тип',
  params: updateTypeRequestSchema['params'],
  body: updateTypeRequestSchema['body'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    200: typeResponseSchema,
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// DELETE Schema
export const deleteTypeSchema = {
  tags: ['type'],
  summary: 'Удалить тип',
  params: removeTypeRequestSchema['params'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    200: Type.Null(),
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};
