import { type MultipartFile } from '@fastify/multipart';
import { type UploadService } from '../services/upload-service';
import { type FastifyRequestTypeBox, type UploadFile } from './type';
import { type FastifyReply } from 'fastify';
import { ApiError } from '../exception/api-errors';

const isMultiPart = (file: unknown): file is MultipartFile => {
  return typeof file === 'object' && file !== null && 'file' in file && 'toBuffer' in file;
};

export class UploadController {
  constructor(private uploadService: UploadService) {}

  public async upload(req: FastifyRequestTypeBox<UploadFile>, res: FastifyReply) {
    const file = req.body.file;
    if (isMultiPart(file)) {
      const response = await this.uploadService.save(file);
      return res.status(200).send(response);
    }
    throw ApiError.ValidationError('Поля в файле невалидны');
  }
}
