import { ApiError } from '../exception/api-errors';
import type { FastifyReply, FastifyRequest } from 'fastify';

interface ValidationError {
  code: 'FST_ERR_VALIDATION';
  validation: {
    instancePath: string;
    message: string;
  }[];
}

function isValidationError(error: unknown): error is ValidationError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'FST_ERR_VALIDATION' &&
    'validation' in error
  );
}

export const errorMiddleware = (err: unknown, req: FastifyRequest, res: FastifyReply) => {
  if (err instanceof ApiError) {
    return res.status(err.code).send({ message: err.message, errors: err.errors });
  }

  if (isValidationError(err)) {
    return res.status(400).send({
      message: 'Ошибка валидации данных',
      errors: err.validation
        .map((err) => err.instancePath.replace('/', '') + ' ' + err.message)
        .join('\n'),
    });
  }

  req.server.log.error(err);
  return res.status(500).send({ message: 'Непредвиденная ошибка', errors: err });
};
