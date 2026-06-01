import { type Static } from '@fastify/type-provider-typebox';
import {
  type removeProductFromBasketRequestSchema,
  type updateQuantityProductRequestSchema,
} from '../schemas/basket';
import { type BasketModel, type BasketProductModel } from '../models';

export interface GetProductListOptions {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export type GetProductInfoListOptions = Omit<GetProductListOptions, 'sortBy' | 'sortOrder'>;

export interface AddProductOptions {
  userId?: number;
  productId: number;
  sessionId?: string;
}

type WithAuth<T> = T & {
  userId?: number;
  sessionId?: string;
};

export type UpdateBasketProductOptions = WithAuth<
  Static<(typeof updateQuantityProductRequestSchema)['body']>
>;

export type RemoveProductOptions = WithAuth<
  Static<(typeof removeProductFromBasketRequestSchema)['body']>
>;

export interface BasketWithProducts extends BasketModel {
  basketProducts?: BasketProductModel[];
}
