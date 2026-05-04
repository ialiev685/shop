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
  type uploadSchema,
} from '../schemas';

export type FastifyRequestTypeBox<TSchema extends FastifySchema = FastifySchema> = FastifyRequest<
  RouteGenericInterface,
  RawServerDefault,
  RawRequestDefaultExpression,
  TSchema,
  TypeBoxTypeProvider
>;

export type TypeSchema = typeof typeSchema.typeRequestSchema;
export type UpdateTypeSchema = typeof typeSchema.updateTypeRequestSchema;
export type RemoveTypeSchema = typeof typeSchema.removeTypeRequestSchema;

export type AddProductToBasketSchema = typeof basketSchema.addProductToBasketRequestSchema;
export type UpdateQuantityProductSchema = typeof basketSchema.updateQuantityProductRequestSchema;
export type RemoveProductFromBasketSchema =
  typeof basketSchema.removeProductFromBasketRequestSchema;
export type ClearBasketSchema = typeof basketSchema.clearBasketRequestSchema;

export type ProductSchema = typeof productSchema.productRequestSchema;
export type RemoveProductSchema = typeof productSchema.removeProductRequestSchema;
export type UpdateProductSchema = typeof productSchema.updateProductRequestSchema;
export type ProductListSchema = typeof productSchema.getProductListRequestSchema;

export type ProductInfoSchema = typeof productInfoSchema.productInfoRequestSchema;
export type UpdateProductInfoSchema = typeof productInfoSchema.updateProductInfoRequestSchema;
export type RemoveProductInfoSchema = typeof productInfoSchema.removeProductInfoRequestSchema;
export type ProductInfoListSchema = typeof productInfoSchema.getProductInfoListRequestSchema;

export type UploadFile = typeof uploadSchema.postUploadSchema;
