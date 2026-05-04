import { type FastifyReply } from 'fastify';
import { type TypeService } from '../services/type-service';
import {
  type FastifyRequestTypeBox,
  type UpdateTypeSchema,
  type RemoveTypeSchema,
  type TypeSchema,
} from './type';

export class TypeController {
  constructor(private typeService: TypeService) {}
  public async addNameType(req: FastifyRequestTypeBox<TypeSchema>, res: FastifyReply) {
    const { name } = req.body;
    const nameType = await this.typeService.addNameType(name);
    return res.status(201).send(nameType);
  }

  public async getTypeList(_req: FastifyRequestTypeBox, res: FastifyReply) {
    const types = await this.typeService.getTypeList();
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
