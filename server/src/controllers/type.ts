import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import {
  type FastifyRequest,
  type FastifySchema,
  type RawRequestDefaultExpression,
  type RawServerDefault,
  type RouteGenericInterface,
} from 'fastify';
import {
  type productInfoSchema,
  type basketSchema,
  type productSchema,
  type typeSchema,
} from '../schemas';

export type FastifyRequestTypeBox<TSchema extends FastifySchema = FastifySchema> = FastifyRequest<
  RouteGenericInterface,
  RawServerDefault,
  RawRequestDefaultExpression,
  TSchema,
  TypeBoxTypeProvider
>;

export type TypeSchema = typeof typeSchema.typeSchema;
export type UpdateTypeSchema = typeof typeSchema.updateTypeSchema;
export type RemoveTypeSchema = typeof typeSchema.removeTypeSchema;

export type AddProductToBasketSchema = typeof basketSchema.addProductToBasketSchema;
export type UpdateQuantityProductSchema = typeof basketSchema.updateQuantityProductSchema;
export type RemoveProductFromBasketSchema = typeof basketSchema.removeProductFromBasketSchema;
export type ClearBasketSchema = typeof basketSchema.clearBasketSchema;

export type ProductSchema = typeof productSchema.productSchema;
export type RemoveProductSchema = typeof productSchema.removeProductSchema;
export type UpdateProductSchema = typeof productSchema.updateProductSchema;
export type ProductListSchema = typeof productSchema.getProductListSchema;

export type ProductInfoSchema = typeof productInfoSchema.productInfoSchema;
export type UpdateProductInfoSchema = typeof productInfoSchema.updateProductInfoSchema;
export type RemoveProductInfoSchema = typeof productInfoSchema.removeProductInfoSchema;
export type ProductInfoListSchema = typeof productInfoSchema.getProductInfoListSchema;
