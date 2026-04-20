import { type FastifyInstance } from 'fastify';
import { ForeignKeyConstraintError, Op, UniqueConstraintError } from 'sequelize';
import { ApiError } from '../exception/api-errors';

export class TypeService {
  constructor(private fastifyInstance: FastifyInstance) {}

  public async addNameType(name: string) {
    try {
      const type = await this.fastifyInstance.db.Type.create({ name });
      return type;
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw ApiError.BadRequestError(`Тип ${name} уже существует`);
      }
      throw error;
    }
  }

  public async getTypeList() {
    const types = await this.fastifyInstance.db.Type.findAll({
      order: [['name', 'ASC']],
    });
    return types;
  }

  public async updateType(typeId: number, name: string) {
    const existingType = await this.fastifyInstance.db.Type.findOne({
      where: {
        name: {
          [Op.iLike]: name,
        },
      },
    });

    if (existingType) {
      throw ApiError.BadRequestError('Тип с таким именем уже существует');
    }

    const [updatedCount, updatedTypes] = await this.fastifyInstance.db.Type.update(
      { name },
      {
        where: { id: typeId, name: { [Op.ne]: name } },
        returning: true,
      },
    );

    if (updatedCount === 0) {
      throw ApiError.BadRequestError(`Тип со значением '${typeId}' не существует`);
    }

    return updatedTypes[0];
  }

  public async removeType(typeId: number) {
    try {
      const type = await this.fastifyInstance.db.Type.findByPk(typeId);
      if (!type) {
        throw ApiError.BadRequestError(`Тип со значением '${typeId}' не существует`);
      }
      await type.destroy();
    } catch (error) {
      if (error instanceof ForeignKeyConstraintError) {
        throw ApiError.BadRequestError(
          `Невозможно удалить тип '${typeId}' т к используется в других записях.`,
        );
      }
      throw error;
    }
  }
}
