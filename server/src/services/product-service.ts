import { type FastifyInstance } from 'fastify';
import { UniqueConstraintError } from 'sequelize';
import { ApiError } from '../exception/api-errors';

interface ProductParams {
  name: string;
  price: number;
  typeId: number;
  img: string;
  sku: string;
}

export class ProductService {
  constructor(private fastifyInstance: FastifyInstance) {}

  public async addProduct(params: ProductParams) {
    try {
      const product = await this.fastifyInstance.db.Product.create({
        name: params.name,
        price: params.price,
        typeId: params.typeId,
        img: params.img,
        sku: params.sku,
      });

      return product;
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        const field = error.errors?.[0]?.path;
        throw ApiError.BadRequestError(`Значение поля '${field}' уже существует`);
      }

      throw error;
    }
  }
}
