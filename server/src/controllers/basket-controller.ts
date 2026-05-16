import { type FastifyReply, type FastifyRequest } from 'fastify';
import { type BasketService } from '../services/basket-service';
import {
  type AddProductToBasketSchema,
  type FastifyRequestTypeBox,
  type UpdateQuantityProductSchema,
  type RemoveProductFromBasketSchema,
  type ClearBasketSchema,
} from './type';
import { SESSION_ID } from '../middleware/constants';

export class BasketController {
  constructor(private basketService: BasketService) {}
  private getSessionId(req: FastifyRequest) {
    if (req?.user?.id) return undefined;
    return req.cookies[SESSION_ID];
  }

  public async getProducts(req: FastifyRequest, res: FastifyReply) {
    const basket = await this.basketService.getProducts(req?.user?.id, this.getSessionId(req));
    return res.status(200).send(basket);
  }

  public async addProduct(req: FastifyRequestTypeBox<AddProductToBasketSchema>, res: FastifyReply) {
    const basketProduct = await this.basketService.addProduct(
      req.user?.id ?? NaN,
      req.body.productId,
    );
    return res.status(200).send(basketProduct);
  }

  public async updateQuantityProduct(
    req: FastifyRequestTypeBox<UpdateQuantityProductSchema>,
    res: FastifyReply,
  ) {
    const basketProduct = await this.basketService.updateQuantityProduct({
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
      userId: req.user?.id ?? NaN,
      ...req.body,
    });
    return res.status(200).send();
  }

  public async clearProduct(req: FastifyRequestTypeBox<ClearBasketSchema>, res: FastifyReply) {
    const basketProduct = await this.basketService.clearBasket({
      userId: req.user?.id ?? NaN,
      ...req.body,
    });
    return res.status(200).send(basketProduct);
  }
}
