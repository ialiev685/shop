import { type FastifyPluginCallback } from 'fastify';
import { TypeController } from '../../controllers/type-controller';
import { TypeService } from '../../services/type-service';
import { typeSchema } from '../../schemas';

const typeRoutes: FastifyPluginCallback = (instance) => {
  const typeService = new TypeService(instance);
  const typeController = new TypeController(typeService);

  instance.post(
    '/addNameType',
    { schema: typeSchema.postTypeSchema },
    typeController.addNameType.bind(typeController),
  );
  instance.patch(
    '/updateType/:typeId',
    { schema: typeSchema.patchTypeSchema },
    typeController.updateType.bind(typeController),
  );
  instance.delete(
    '/removeType/:typeId',
    { schema: typeSchema.deleteTypeSchema },
    typeController.removeType.bind(typeController),
  );
  instance.get(
    '/typeList',
    { schema: typeSchema.getTypeSchema },
    typeController.getTypeList.bind(typeController),
  );
};

export default typeRoutes;
