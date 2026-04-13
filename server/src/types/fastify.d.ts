import 'fastify';

interface CurrentUser {
  email: string;
  id: number;
  isActivate: boolean;
  role: string;
  accessToken: string;
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: CurrentUser | null;
  }
}
