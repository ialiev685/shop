/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface RegisterCreatePayload {
  /** @format email */
  email: string;
  /** @minLength 8 */
  password: string;
  /** @format uri */
  redirectUrl: string;
}

export interface RegisterCreateData {
  /** @format email */
  email: string;
  id: number;
  /** @default false */
  isActivate: boolean;
  role: "user" | "admin";
  accessToken?: string;
}

export interface ActivateDetailParams {
  /** @format uri */
  redirectUrl?: string;
  /** @format uuid */
  uuid: string;
}

export type ActivateDetailData = string;

export interface LoginCreatePayload {
  /** @format email */
  email: string;
  /** @minLength 8 */
  password: string;
}

export interface LoginCreateData {
  /** @format email */
  email: string;
  id: number;
  /** @default false */
  isActivate: boolean;
  role: "user" | "admin";
  accessToken?: string;
}

export interface ForgotPasswordCreatePayload {
  /** @format email */
  email: string;
  /** @format uri */
  redirectUrl: string;
}

export type ForgotPasswordCreateData = any;

export interface ResetPasswordCreatePayload {
  /** @format uuid */
  uuid: string;
  /** @minLength 8 */
  password: string;
}

export type ResetPasswordCreateData = any;

export interface RefreshCreateData {
  /** @format email */
  email: string;
  id: number;
  /** @default false */
  isActivate: boolean;
  role: "user" | "admin";
  accessToken?: string;
}

export interface CurrentUserListData {
  /** @format email */
  email: string;
  id: number;
  /** @default false */
  isActivate: boolean;
  role: "user" | "admin";
  accessToken?: string;
}

export type LogoutCreateData = any;

export interface V1BasketListListData {
  id: number;
  userId: number;
  basketProducts: {
    id: number;
    basketId: number;
    productId: number;
    quantity: number;
    product: {
      id: number;
      name: string;
      price: number;
      img: string;
      sku: string;
      rating: number;
    };
  }[];
}

export interface V1AddProductToBasketCreatePayload {
  productId: number;
}

export interface V1AddProductToBasketCreateData {
  id: number;
  basketId: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    img: string;
    sku: string;
    rating: number;
  };
}

export interface V1UpdateQuantityProductCreatePayload {
  basketId: number;
  productId: number;
  /**
   * @min 1
   * @max 999
   */
  quantity: number;
}

export interface V1UpdateQuantityProductCreateData {
  id: number;
  basketId: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    img: string;
    sku: string;
    rating: number;
  };
}

export interface V1RemoveProductFromBasketCreatePayload {
  basketId: number;
  productId: number;
}

export type V1RemoveProductFromBasketCreateData = any;

export interface V1ClearBasketCreatePayload {
  basketId: number;
}

export type V1ClearBasketCreateData = any;

export interface V1AddProductCreatePayload {
  name: string;
  price: number;
  typeId: number;
  img: string;
  sku: string;
}

export interface V1AddProductCreateData {
  id: number;
  name: string;
  price: number;
  rating: number;
  typeId: number;
  img: string;
  sku: string;
  type: {
    id: number;
    name: string;
  };
}

export interface V1UpdateProductPartialUpdatePayload {
  name?: string;
  price?: number;
  typeId?: number;
  img?: string;
  sku?: string;
}

export interface V1UpdateProductPartialUpdateParams {
  productId: number;
}

export interface V1UpdateProductPartialUpdateData {
  id: number;
  name: string;
  price: number;
  rating: number;
  typeId: number;
  img: string;
  sku: string;
  type: {
    id: number;
    name: string;
  };
}

export interface V1RemoveProductDeleteParams {
  productId: number;
}

export type V1RemoveProductDeleteData = any;

export interface V1ProductListByTypeDetailParams {
  /**
   * @min 1
   * @default 1
   */
  page?: number;
  /**
   * @min 1
   * @max 100
   * @default 10
   */
  limit?: number;
  search?: string;
  /** @default "name" */
  sortBy?: string;
  /** @default "DESC" */
  sortOrder?: "ASC" | "DESC";
  typeId: number;
}

export interface V1ProductListByTypeDetailData {
  data: {
    id: number;
    name: string;
    price: number;
    rating: number;
    typeId: number;
    img: string;
    sku: string;
    type: {
      id: number;
      name: string;
    };
  }[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface V1AllProductListListParams {
  /**
   * @min 1
   * @default 1
   */
  page?: number;
  /**
   * @min 1
   * @max 100
   * @default 10
   */
  limit?: number;
  search?: string;
  /** @default "name" */
  sortBy?: string;
  /** @default "DESC" */
  sortOrder?: "ASC" | "DESC";
}

export interface V1AllProductListListData {
  data: {
    id: number;
    name: string;
    price: number;
    rating: number;
    typeId: number;
    img: string;
    sku: string;
    type: {
      id: number;
      name: string;
    };
  }[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface V1AddProductInfoCreatePayload {
  name: string;
  description: string;
  productId: number;
}

export interface V1AddProductInfoCreateData {
  id: number;
  name: string;
  description: string;
  productId: number;
}

export interface V1UpdateProductInfoPartialUpdatePayload {
  name?: string;
  description?: string;
}

export interface V1UpdateProductInfoPartialUpdateParams {
  productInfoId: number;
}

export interface V1UpdateProductInfoPartialUpdateData {
  id: number;
  name: string;
  description: string;
  productId: number;
}

export interface V1RemoveProductInfoDeleteParams {
  productInfoId: number;
}

export type V1RemoveProductInfoDeleteData = any;

export interface V1ProductInfoListDetailParams {
  productId: number;
}

export type V1ProductInfoListDetailData = {
  id: number;
  name: string;
  description: string;
  productId: number;
}[];

export interface V1AddNameTypeCreatePayload {
  name: string;
}

export interface V1AddNameTypeCreateData {
  id: number;
  name: string;
}

export interface V1UpdateTypePartialUpdatePayload {
  name: string;
}

export interface V1UpdateTypePartialUpdateParams {
  typeId: number;
}

export interface V1UpdateTypePartialUpdateData {
  id: number;
  name: string;
}

export interface V1RemoveTypeDeleteParams {
  typeId: number;
}

export type V1RemoveTypeDeleteData = any;

export type V1TypeListListData = {
  id: number;
  name: string;
}[];

export interface V1UploadFileCreatePayload {
  file: {
    type: "file";
    filename: string;
    encoding: string;
    mimetype: string;
    file: any;
  };
}

export interface V1UploadFileCreateData {
  /** @format uuid */
  uuid: string;
  /** @format uri */
  url: string;
}

export interface V1RemoveFileDeleteParams {
  /** @format uuid */
  uuid: string;
}

export type V1RemoveFileDeleteData = any;
