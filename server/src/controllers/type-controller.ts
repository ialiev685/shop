import { type FastifyReply } from 'fastify';
import { type TypeService } from '../services/type-service';
import {
  type FastifyRequestTypeBox,
  type UpdateTypeSchema,
  type RemoveTypeSchema,
  type AddTypeSchema,
  type GetTypeSchema,
} from './type';

export class TypeController {
  constructor(private typeService: TypeService) {}
  public async addNameType(req: FastifyRequestTypeBox<AddTypeSchema>, res: FastifyReply) {
    const { name } = req.body;
    const nameType = await this.typeService.addNameType(name);
    return res.status(201).send(nameType);
  }

  public async getTypeList(req: FastifyRequestTypeBox<GetTypeSchema>, res: FastifyReply) {
    const types = await this.typeService.getTypeList(req.query.search);
    return res.status(200).send(types);
  }

  public async updateType(req: FastifyRequestTypeBox<UpdateTypeSchema>, res: FastifyReply) {
    const type = await this.typeService.updateType(req.params.typeId, req.body.name);
    return res.status(200).send(type);
  }

  public async removeType(req: FastifyRequestTypeBox<RemoveTypeSchema>, res: FastifyReply) {
    await this.typeService.removeType(req.params.typeId);
    return res.status(200).send();
  }
}
