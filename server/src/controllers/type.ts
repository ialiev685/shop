import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import {
  type FastifyRequest,
  type FastifySchema,
  type RawRequestDefaultExpression,
  type RawServerDefault,
  type RouteGenericInterface,
} from 'fastify';
import {
  type basketSchema,
  type productInfoSchemaBody,
  type productSchemaBody,
  type typeSchemaBody,
} from '../schemas';

export type FastifyRequestTypeBox<TSchema extends FastifySchema> = FastifyRequest<
  RouteGenericInterface,
  RawServerDefault,
  RawRequestDefaultExpression,
  TSchema,
  TypeBoxTypeProvider
>;

export type TypeBodySchema = typeof typeSchemaBody;
export type ProductBodySchema = typeof productSchemaBody;
export type ProductInfoBodySchema = typeof productInfoSchemaBody;
export type AddProductToBasketBodySchema = typeof basketSchema.addProductToBasketSchema;
export type UpdateQuantityProductSchema = typeof basketSchema.updateQuantityProductSchema;
export type RemoveProductSchema = typeof basketSchema.removeProductSchema;
export type ClearBasketSchema = typeof basketSchema.clearBasketSchema;
