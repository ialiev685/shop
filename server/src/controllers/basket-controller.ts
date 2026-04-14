import { type FastifyReply, type FastifyRequest } from 'fastify';
import { type BasketService } from '../services/basket-service';

export class BasketController {
  constructor(private basketService: BasketService) {}
  public async getProducts(req: FastifyRequest, res: FastifyReply) {
    const basket = await this.basketService.getProducts(req.user?.id ?? NaN);
    return res.status(200).send(basket);
  }
}
