import Type from 'typebox';
import { errorResponseSchema } from './error';

export const typeSchema = {
  body: Type.Object({
    name: Type.String(),
  }),
};

export const updateTypeSchema = {
  params: Type.Object({
    typeId: Type.Number(),
  }),
  body: Type.Object({
    name: Type.String(),
  }),
};

export const removeTypeSchema = {
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
  body: typeSchema['body'],
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
  params: updateTypeSchema['params'],
  body: updateTypeSchema['body'],
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
  params: removeTypeSchema['params'],
  response: {
    200: Type.Null(),
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};
