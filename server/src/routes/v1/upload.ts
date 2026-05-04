import { type FastifyPluginCallback } from 'fastify';
import { postUploadSchema } from '../../schemas/upload';

import { UploadController } from '../../controllers/upload-controller';
import { UploadService } from '../../services/upload-service';

const uploadRoutes: FastifyPluginCallback = (instance) => {
  const uploadService = new UploadService();
  const uploadController = new UploadController(uploadService);

  instance.post(
    '/upload',
    { schema: postUploadSchema },
    uploadController.upload.bind(uploadController),
  );
};

export default uploadRoutes;
