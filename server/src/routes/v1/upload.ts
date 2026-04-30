import { type FastifyPluginCallback } from 'fastify';
import { postUploadSchema } from '../../schemas/upload';

const uploadRoutes: FastifyPluginCallback = (instance) => {
  instance.post('/upload', { schema: postUploadSchema }, async (req, _res) => {
    const file = await req.file();

    console.log('file', file);
  });
};

export default uploadRoutes;
