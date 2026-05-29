import { type FastifyReply, type FastifyRequest } from 'fastify';
import { type BasketService } from '../services/basket-service';
import {
  type AddProductToBasketSchema,
  type FastifyRequestTypeBox,
  type UpdateQuantityProductSchema,
  type RemoveProductFromBasketSchema,
} from './type';
import { SESSION_ID } from '../middleware/constants';

export class BasketController {
  constructor(private basketService: BasketService) {}
  private getSessionId(req: FastifyRequest) {
    return req.cookies[SESSION_ID];
  }

  public async getProducts(req: FastifyRequest, res: FastifyReply) {
    const basket = await this.basketService.getProducts(req?.user?.id, this.getSessionId(req));
    return res.status(200).send(basket);
  }

  public async addProduct(req: FastifyRequestTypeBox<AddProductToBasketSchema>, res: FastifyReply) {
    const basketProduct = await this.basketService.addProduct({
      userId: req.user?.id ?? NaN,
      productId: req.body.productId,
      sessionId: this.getSessionId(req) ?? '',
    });
    return res.status(200).send(basketProduct);
  }

  public async updateQuantityProduct(
    req: FastifyRequestTypeBox<UpdateQuantityProductSchema>,
    res: FastifyReply,
  ) {
    const basketProduct = await this.basketService.updateQuantityProduct({
      sessionId: this.getSessionId(req) ?? '',
      userId: req.user?.id ?? NaN,
      ...req.body,
    });
    return res.status(200).send(basketProduct);
  }

  public async removeProduct(
    req: FastifyRequestTypeBox<RemoveProductFromBasketSchema>,
    res: FastifyReply,
  ) {
    await this.basketService.removeProduct({
      sessionId: this.getSessionId(req) ?? '',
      userId: req.user?.id ?? NaN,
      ...req.body,
    });
    return res.status(200).send();
  }

  public async clearProduct(req: FastifyRequestTypeBox, res: FastifyReply) {
    const basketProduct = await this.basketService.clearBasket(
      req.user?.id,
      this.getSessionId(req),
    );
    return res.status(200).send(basketProduct);
  }
}
