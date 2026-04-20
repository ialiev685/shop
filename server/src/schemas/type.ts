import Type from 'typebox';
import { errorResponseSchema } from './error';

export const typeRequestSchema = {
  body: Type.Object({
    name: Type.String(),
  }),
};

export const updateTypeRequestSchema = {
  params: Type.Object({
    typeId: Type.Number(),
  }),
  body: Type.Object({
    name: Type.String(),
  }),
};

export const removeTypeRequestSchema = {
  params: Type.Object({
    typeId: Type.Number(),
  }),
};

const typeResponseSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
});

// GET schema
export const getTypeSchema = {
  tags: ['type'],
  summary: 'Получить типы',
  response: {
    200: typeResponseSchema,
    500: errorResponseSchema,
  },
};

// POST Schema
export const postTypeSchema = {
  tags: ['type'],
  summary: 'Добавить тип',
  body: typeRequestSchema['body'],
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
  response: {
    200: Type.Null(),
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};
