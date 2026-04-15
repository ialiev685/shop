import { type FastifyReply } from 'fastify';
import { type TypeService } from '../services/type-service';
import { type FastifyRequestTypeBox, type TypeBodySchema } from './type';

export class TypeController {
  constructor(private typeService: TypeService) {}
  public async addNameType(req: FastifyRequestTypeBox<TypeBodySchema>, res: FastifyReply) {
    const { name } = req.body;
    const nameType = await this.typeService.addNameType(name);
    res.status(201).send(nameType);
  }
}
