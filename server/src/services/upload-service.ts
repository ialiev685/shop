import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'node:fs/promises';
import { type MultipartFile } from '@fastify/multipart';
import { ApiError } from '../exception/api-errors';

export class UploadService {
  private uploadFolder = 'static/upload';
  public basePath = path.resolve(this.uploadFolder);

  public async save(file: MultipartFile) {
    const id = uuidv4();
    const uploadPath = path.join(this.basePath, id);
    await fs.mkdir(uploadPath, { recursive: true });

    const hasDirectory = await this.hasDirectory(uploadPath);

    if (hasDirectory) {
      const filePath = path.join(uploadPath, file.filename);
      const convertToArrayFile = await file.toBuffer();
      await fs.writeFile(filePath, convertToArrayFile);

      return { uuid: id, url: path.join(this.uploadFolder, id, file.filename) };
    }

    throw ApiError.FileSystemError('Ошибка при сохранении файла');
  }

  public async remove(uuid: string) {
    const filePath = path.join(this.basePath, uuid);
    const hasDirectory = await this.hasDirectory(filePath);
    if (!hasDirectory) {
      throw ApiError.BadRequestError('Файла не существует');
    }
    await fs.rm(filePath, { recursive: true, force: true });
  }

  private async hasDirectory(path: string) {
    const hasDirectory = await fs
      .access(path)
      .then(() => true)
      .catch(() => false);

    return hasDirectory;
  }
}
