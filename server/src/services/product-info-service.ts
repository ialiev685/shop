import { type FastifyInstance } from 'fastify';
import { UniqueConstraintError } from 'sequelize';
import { ApiError } from '../exception/api-errors';
import { type Static } from 'typebox';
import { type productInfoSchemaBody } from '../schemas';

type ProductInfoParams = Static<(typeof productInfoSchemaBody)['body']>;

export class ProductInfoService {
  constructor(private fastifyInstance: FastifyInstance) {}

  public async addProductInfo(params: ProductInfoParams) {
    const product = await this.fastifyInstance.db.Product.findByPk(params.productId);

    if (!product) {
      throw ApiError.BadRequestError(
        `Значение со значением 'productId=${params.productId}' не существует`,
      );
    }

    try {
      const productInfo = await this.fastifyInstance.db.ProductInfo.create({
        name: params.name,
        description: params.description,
        productId: params.productId,
      });

      return productInfo;
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        const field = error.errors?.[0]?.path;
        throw ApiError.BadRequestError(`Значение поля '${field}' уже существует`);
      }
      throw error;
    }
  }
}
