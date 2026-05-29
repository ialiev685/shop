import { type FastifyRequest, type FastifyReply } from 'fastify';
import { ApiError } from '../exception/api-errors';

export const adminMiddleware = async (req: FastifyRequest, _res: FastifyReply) => {
  if (req.user?.role === 'admin') {
    return;
  }

  throw ApiError.ForbiddenError();
};
