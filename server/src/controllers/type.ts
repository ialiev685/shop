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
  type productSchema,
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
export type ProductBodySchema = typeof productSchema.productSchemaBody;
export type ProductInfoBodySchema = typeof productInfoSchemaBody;
export type AddProductToBasketBodySchema = typeof basketSchema.addProductToBasketSchema;
export type UpdateQuantityProductSchema = typeof basketSchema.updateQuantityProductSchema;
export type RemoveProductFromBasketSchema = typeof basketSchema.removeProductFromBasketSchema;
export type ClearBasketSchema = typeof basketSchema.clearBasketSchema;

export type RemoveProductSchema = typeof productSchema.removeProductSchemaBody;
export type UpdateProductSchema = typeof productSchema.updateProductSchemaBody;
