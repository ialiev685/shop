import { type FastifyReply, type FastifyRequest } from 'fastify';
import { SESSION_ID } from './constants';
import { validate, v4 as uuid } from 'uuid';

export const guestMiddleware = async (req: FastifyRequest, res: FastifyReply) => {
  if (req.cookies[SESSION_ID] && validate(req.cookies[SESSION_ID])) {
    return;
  } else {
    const sessionId = uuid();
    res.setCookie(SESSION_ID, sessionId, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    return;
  }
};
