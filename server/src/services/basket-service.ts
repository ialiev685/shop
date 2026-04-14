import { type FastifyInstance } from 'fastify';

export class BasketService {
  constructor(private fastifyInstance: FastifyInstance) {}

  public async addProduct(userId: number) {
    const [basket, created] = await this.fastifyInstance.db.Basket.findOrCreate({
      where: {
        userId,
      },
      include: {
        model: this.fastifyInstance.db.BasketProduct,
        required: false,
        as: 'basketProducts',
      },
    });

    if (created) {
      return basket;
    }

    return basket;
  }

  public async getProducts(userId: number) {
    const [basket, created] = await this.fastifyInstance.db.Basket.findOrCreate({
      where: {
        userId,
      },
      include: {
        model: this.fastifyInstance.db.BasketProduct,
        required: false,
        as: 'basketProducts',
      },
    });

    if (created) {
      return basket;
    }

    return basket;
  }
}
