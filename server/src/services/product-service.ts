import { type FastifyInstance } from 'fastify';
import { UniqueConstraintError } from 'sequelize';
import { ApiError } from '../exception/api-errors';
import { type Static } from 'typebox';
import { type updateProductSchemaBody, type productSchemaBody } from '../schemas/product';

type ProductParams = Static<(typeof productSchemaBody)['body']>;
type updateProductParams = Static<(typeof updateProductSchemaBody)['body']>;

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

  public async removeProduct(productId: number) {
    const product = await this.fastifyInstance.db.Product.findByPk(productId);
    if (!product) {
      throw ApiError.BadRequestError(`Запись со значением '${productId}' не существует`);
    }
    await product.destroy();
  }

  public async updateProduct(params: updateProductParams) {
    const { productId, ...otherParams } = params;
    const product = await this.fastifyInstance.db.Product.findByPk(productId);
    if (!product) {
      throw ApiError.BadRequestError(`Запись со значением '${params.productId}' не существует`);
    }
    await product.update(otherParams);
  }
}
