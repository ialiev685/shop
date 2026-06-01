import { type FastifyPluginCallback } from 'fastify';
import { postRemoveFileSchema, postUploadSchema } from '../../schemas/upload';

import { UploadController } from '../../controllers/upload-controller';
import { UploadService } from '../../services/upload-service';

const uploadRoutes: FastifyPluginCallback = (instance) => {
  const uploadService = new UploadService();
  const uploadController = new UploadController(uploadService);

  instance.post(
    '/uploadFile',
    { schema: postUploadSchema },
    uploadController.upload.bind(uploadController),
  );

  instance.delete(
    '/removeFile/:uuid',
    { schema: postRemoveFileSchema },
    uploadController.remove.bind(uploadController),
  );
};

export default uploadRoutes;
