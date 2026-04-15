import { type FastifyInstance } from 'fastify';
import { UniqueConstraintError } from 'sequelize';
import { ApiError } from '../exception/api-errors';

export class TypeService {
  constructor(private fastifyInstance: FastifyInstance) {}

  public async addNameType(name: string) {
    try {
      const type = await this.fastifyInstance.db.Type.create({ name });
      return type;
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw ApiError.BadRequestError('Такая запись существует');
      }
      throw error;
    }
  }
}
