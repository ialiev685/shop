import 'fastify';
import { type User } from './user';
import { type BasketModel, type BasketProductModel } from '../models';

interface User {
  email: string;
  id: number;
  isActivate: boolean;
  role: string;
  accessToken?: string;
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: User | null;
  }
  interface FastifyInstance {
    db: {
      sequelize: Sequelize;
      Basket: typeof BasketModel;
      BasketProduct: typeof BasketProductModel;
    };
  }
}
