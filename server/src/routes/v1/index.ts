import { type FastifyPluginCallback } from 'fastify';
import basketRoutes from './basket-routes';
import productRoutes from './product-routes';
import productInfoRoutes from './product-info-routes';
import typeRoutes from './type-routes';

const v1Routes: FastifyPluginCallback = (instance, _, done) => {
  instance.register(basketRoutes);
  instance.register(productRoutes);
  instance.register(productInfoRoutes);
  instance.register(typeRoutes);

  done();
};

export default v1Routes;
