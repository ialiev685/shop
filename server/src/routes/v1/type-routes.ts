import { type FastifyPluginCallback } from 'fastify';
import { TypeController } from '../../controllers/type-controller';
import { TypeService } from '../../services/type-service';
import { typeSchema } from '../../schemas';

const typeRoutes: FastifyPluginCallback = (instance) => {
  const typeService = new TypeService(instance);
  const typeController = new TypeController(typeService);

  instance.post(
    '/addNameType',
    { schema: typeSchema },
    typeController.addNameType.bind(typeController),
  );
};

export default typeRoutes;
