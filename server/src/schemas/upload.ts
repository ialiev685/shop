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

export const removeFileRequestSchema = {
  params: Type.Object({
    uuid: Type.String({ format: 'uuid' }),
  }),
};

const fileResponseSchema = Type.Object({
  uuid: Type.String({ format: 'uuid' }),
  url: Type.String({ format: 'uri' }),
});

// POST Schema
export const postUploadSchema = {
  tags: ['file'],
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

// POST Schema
export const postRemoveFileSchema = {
  tags: ['file'],
  summary: 'Удалить файл',
  params: removeFileRequestSchema['params'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    200: Type.Null(),
    500: errorResponseSchema,
  },
};
