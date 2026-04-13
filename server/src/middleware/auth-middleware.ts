import { type HookHandlerDoneFunction, type FastifyReply, type FastifyRequest } from 'fastify';
import { ApiError } from '../exception/api-errors';

const CURRENT_USER_URL = `${process.env.AUTH_URL}/api/v1/currentUser`;

interface SuccessResponse {
  email: string;
  id: number;
  isActivate: boolean;
  role: string;
  accessToken: string;
}

interface ErrorResponse {
  message: string;
  errors?: unknown[];
}

const isErrorResponse = (data: unknown): data is ErrorResponse => {
  return typeof data === 'object' && Boolean(data && 'message' in data);
};

const isUserResponse = (data: unknown): data is SuccessResponse => {
  return typeof data === 'object' && Boolean(data && 'email' in data);
};

export const authMiddleware = async (req: FastifyRequest, _res: FastifyReply) => {
  if (!process.env.AUTH_URL) {
    throw ApiError.BadRequestError('Невалидный url авторизации');
  }

  if (!req.headers.authorization || !req.headers.cookie) {
    throw ApiError.UnauthorizedError();
  }
  const response = await fetch(CURRENT_USER_URL, {
    headers: {
      Authorization: req.headers.authorization,
      Cookie: req.headers.cookie,
      'Content-Type': 'application/json',
    },
  });
  const content = await response.json();
  if (response.ok && isUserResponse(content)) {
    req.user = content;
    return;
  }

  throw ApiError.CheckAuthorizationError(
    response.status,
    isErrorResponse(content) ? content.message : 'Непредвиденная ошибка',
  );
};
