import { type FastifyPluginCallback } from 'fastify';
import { TypeController } from '../../controllers/type-controller';
import { TypeService } from '../../services/type-service';
import { typeSchema } from '../../schemas';
import { adminMiddleware } from '../../middleware/admin-middleware';

const typeRoutes: FastifyPluginCallback = (instance) => {
  const typeService = new TypeService(instance);
  const typeController = new TypeController(typeService);

  instance.post(
    '/addNameType',
    { schema: typeSchema.postTypeSchema, preHandler: [adminMiddleware] },
    typeController.addNameType.bind(typeController),
  );
  instance.patch(
    '/updateType/:typeId',
    { schema: typeSchema.patchTypeSchema, preHandler: [adminMiddleware] },
    typeController.updateType.bind(typeController),
  );
  instance.delete(
    '/removeType/:typeId',
    { schema: typeSchema.deleteTypeSchema, preHandler: [adminMiddleware] },
    typeController.removeType.bind(typeController),
  );
  instance.get(
    '/typeList',
    { schema: typeSchema.getTypeSchema },
    typeController.getTypeList.bind(typeController),
  );
};

export default typeRoutes;
