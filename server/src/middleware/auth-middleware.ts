import jwt from 'jsonwebtoken';
import { type FastifyRequest, type FastifyReply } from 'fastify';
import { ApiError } from '../exception/api-errors';
import { type User } from '../types/user';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET ?? '';

export const isUser = (value: unknown): value is User => {
  return typeof value === 'object' && value !== null && 'email' in value;
};

export const authMiddleware = async (req: FastifyRequest, _res: FastifyReply) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) {
      throw ApiError.UnauthorizedError();
    }
    const decoded = jwt.verify(token, ACCESS_TOKEN);
    if (isUser(decoded)) {
      req.user = decoded;
      return;
    }
    throw ApiError.UnauthorizedError();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw ApiError.UnauthorizedError();
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw ApiError.UnauthorizedError();
    }
    throw ApiError.UnauthorizedError();
  }
};
