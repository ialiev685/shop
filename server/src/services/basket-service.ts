import { type FastifyInstance } from 'fastify';

export class BasketService {
  constructor(private fastifyInstance: FastifyInstance) {}

  public async addProductToBasket(userId: number, productId: number) {
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

    const basketProducts = await this.fastifyInstance.db.Basket.findByPk(basket.id, {
      include: {
        model: this.fastifyInstance.db.BasketProduct,
        as: 'basketProducts',
        required: false,
      },
    });

    return basketProducts;
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
