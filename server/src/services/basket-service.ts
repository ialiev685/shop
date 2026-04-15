import { type FastifyInstance } from 'fastify';
import { ForeignKeyConstraintError } from 'sequelize';
import { ApiError } from '../exception/api-errors';

export class BasketService {
  constructor(private fastifyInstance: FastifyInstance) {}

  public async addProductToBasket(userId: number, productId: number) {
    try {
      const [basket] = await this.fastifyInstance.db.Basket.findOrCreate({
        where: {
          userId,
        },
        defaults: {
          userId,
        },
      });

      const [basketProduct, created] = await this.fastifyInstance.db.BasketProduct.findOrCreate({
        where: {
          basketId: basket.id,
          productId: productId,
        },

        defaults: {
          basketId: basket.id,
          productId: productId,
          quantity: 1,
        },
      });

      if (!created) {
        basketProduct.quantity += 1;
        await basketProduct.save();
      }

      return basketProduct;
    } catch (error) {
      if (error instanceof ForeignKeyConstraintError) {
        throw ApiError.BadRequestError(`Значение '${productId}' поля productId не существует`);
      }
      throw error;
    }
  }

  public async getProducts(userId: number) {
    const [basket] = await this.fastifyInstance.db.Basket.findOrCreate({
      where: {
        userId,
      },
      defaults: {
        userId,
      },
      include: {
        model: this.fastifyInstance.db.BasketProduct,
        required: false,
        as: 'basketProducts',
      },
    });

    return basket;
  }
}
