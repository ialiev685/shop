import Type from 'typebox';
import { errorResponseSchema } from './error';

export const multipartFileRequestSchema = {
  body: Type.Object({
    file: Type.Object({
      type: Type.Literal('file'),
      filename: Type.String(),
      encoding: Type.String(),
      mimetype: Type.String(),
      file: Type.Any(),
    }),
  }),
};

const fileResponseSchema = Type.Object({
  uuid: Type.String({ format: 'uuid' }),
  url: Type.String({ format: 'uri' }),
});

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
    200: fileResponseSchema,
    500: errorResponseSchema,
  },
};
