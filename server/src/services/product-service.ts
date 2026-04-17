import { type FastifyInstance } from 'fastify';
import { UniqueConstraintError } from 'sequelize';
import { ApiError } from '../exception/api-errors';
import { type Static } from 'typebox';
import { type updateProductSchema, type productSchema } from '../schemas/product';

type ProductParams = Static<(typeof productSchema)['body']>;
type updateProductParams = Static<(typeof updateProductSchema)['body']> &
  Static<(typeof updateProductSchema)['params']>;

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
    const { productId, sku, ...otherParams } = params;

    const product = await this.fastifyInstance.db.Product.findByPk(productId);
    if (!product) {
      throw ApiError.BadRequestError(`Запись со значением '${params.productId}' не существует`);
    }

    if (sku && sku !== product.sku) {
      const existing = await this.fastifyInstance.db.Product.findOne({
        where: { sku },
        attributes: ['id'],
      });
      if (existing) {
        throw ApiError.BadRequestError(`Запись со значеним '${sku}' уже существует`);
      }
    }

    const updateData = sku ? { ...otherParams, sku } : otherParams;
    return await product.update(updateData);
  }

  public async getProductList(typeId: number) {
    const productList = await this.fastifyInstance.db.Product.findAll({ where: { typeId } });
    return productList;
  }
}
