import { type FastifyReply, type FastifyRequest } from 'fastify';
import { type BasketService } from '../services/basket-service';
import { type AddProductToBasketBodySchema, type FastifyRequestTypeBox } from './type';

export class BasketController {
  constructor(private basketService: BasketService) {}
  public async getProducts(req: FastifyRequest, res: FastifyReply) {
    const basket = await this.basketService.getProducts(req.user?.id ?? NaN);
    return res.status(200).send(basket);
  }
  public async addProductToBasket(
    req: FastifyRequestTypeBox<AddProductToBasketBodySchema>,
    res: FastifyReply,
  ) {
    const basket = await this.basketService.addProductToBasket(
      req.user?.id ?? NaN,
      req.body.productId,
    );
    return res.status(200).send(basket);
  }
}
