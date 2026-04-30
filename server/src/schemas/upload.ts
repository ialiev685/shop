import Type from 'typebox';
import { errorResponseSchema } from './error';

export const multipartFileRequestSchema = {
  body: Type.Object({
    file: Type.Any(),
    fields: Type.Optional(Type.Any()),
    fieldname: Type.String(),
    filename: Type.String(),
    encoding: Type.String(),
    mimetype: Type.String(),
  }),
};

// POST Schema
export const postUploadSchema = {
  tags: ['upload'],
  summary: 'Загрузить файл',
  body: multipartFileRequestSchema['body'],
  consumes: ['multipart/form-data'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    200: multipartFileRequestSchema,
    500: errorResponseSchema,
  },
};
