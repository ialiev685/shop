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

import type {
  V1AddNameTypeCreateData,
  V1AddNameTypeCreatePayload,
  V1AddProductCreateData,
  V1AddProductCreatePayload,
  V1AddProductInfoCreateData,
  V1AddProductInfoCreatePayload,
  V1AddProductToBasketCreateData,
  V1AddProductToBasketCreatePayload,
  V1AllProductInfoListListData,
  V1AllProductInfoListListParams,
  V1AllProductListListData,
  V1AllProductListListParams,
  V1BasketListListData,
  V1ClearBasketCreateData,
  V1ClearBasketCreatePayload,
  V1ProductByIdDetailData,
  V1ProductByIdDetailParams,
  V1ProductInfoListByIdDetailData,
  V1ProductInfoListByIdDetailParams,
  V1ProductListByTypeDetailData,
  V1ProductListByTypeDetailParams,
  V1RemoveFileDeleteData,
  V1RemoveFileDeleteParams,
  V1RemoveProductDeleteData,
  V1RemoveProductDeleteParams,
  V1RemoveProductFromBasketCreateData,
  V1RemoveProductFromBasketCreatePayload,
  V1RemoveProductInfoDeleteData,
  V1RemoveProductInfoDeleteParams,
  V1RemoveTypeDeleteData,
  V1RemoveTypeDeleteParams,
  V1TypeListListData,
  V1TypeListListParams,
  V1UpdateProductInfoPartialUpdateData,
  V1UpdateProductInfoPartialUpdateParams,
  V1UpdateProductInfoPartialUpdatePayload,
  V1UpdateProductPartialUpdateData,
  V1UpdateProductPartialUpdateParams,
  V1UpdateProductPartialUpdatePayload,
  V1UpdateQuantityProductCreateData,
  V1UpdateQuantityProductCreatePayload,
  V1UpdateTypePartialUpdateData,
  V1UpdateTypePartialUpdateParams,
  V1UpdateTypePartialUpdatePayload,
  V1UploadFileCreateData,
  V1UploadFileCreatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, type RequestParams } from "./http-client";

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags basket
   * @name V1BasketListList
   * @summary Получить корзину пользователя
   * @request GET:/api/v1/basketList
   * @secure
   */
  v1BasketListList = (params: RequestParams = {}) =>
    this.request<
      V1BasketListListData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/basketList`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags basket
   * @name V1AddProductToBasketCreate
   * @summary Добавить продукт в корзину
   * @request POST:/api/v1/addProductToBasket
   * @secure
   */
  v1AddProductToBasketCreate = (
    data: V1AddProductToBasketCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<
      V1AddProductToBasketCreateData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/addProductToBasket`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags basket
   * @name V1UpdateQuantityProductCreate
   * @summary Обновить количество продукта в корзине
   * @request POST:/api/v1/updateQuantityProduct
   * @secure
   */
  v1UpdateQuantityProductCreate = (
    data: V1UpdateQuantityProductCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<
      V1UpdateQuantityProductCreateData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/updateQuantityProduct`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags basket
   * @name V1RemoveProductFromBasketCreate
   * @summary Удалить продукт из корзины
   * @request POST:/api/v1/removeProductFromBasket
   * @secure
   */
  v1RemoveProductFromBasketCreate = (
    data: V1RemoveProductFromBasketCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<
      V1RemoveProductFromBasketCreateData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/removeProductFromBasket`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags basket
   * @name V1ClearBasketCreate
   * @summary Очистить корзину
   * @request POST:/api/v1/clearBasket
   * @secure
   */
  v1ClearBasketCreate = (
    data: V1ClearBasketCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<
      V1ClearBasketCreateData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/clearBasket`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags product
   * @name V1AddProductCreate
   * @summary Добавить продукт
   * @request POST:/api/v1/addProduct
   * @secure
   */
  v1AddProductCreate = (
    data: V1AddProductCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<
      V1AddProductCreateData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/addProduct`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags product
   * @name V1UpdateProductPartialUpdate
   * @summary Обновить продукт
   * @request PATCH:/api/v1/updateProduct/{productId}
   * @secure
   */
  v1UpdateProductPartialUpdate = (
    { productId }: V1UpdateProductPartialUpdateParams,
    data: V1UpdateProductPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<
      V1UpdateProductPartialUpdateData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/updateProduct/${productId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags product
   * @name V1RemoveProductDelete
   * @summary Удалить продукт
   * @request DELETE:/api/v1/removeProduct/{productId}
   * @secure
   */
  v1RemoveProductDelete = (
    { productId }: V1RemoveProductDeleteParams,
    params: RequestParams = {},
  ) =>
    this.request<
      V1RemoveProductDeleteData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/removeProduct/${productId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags product
   * @name V1ProductListByTypeDetail
   * @summary Получить список продуктов по типу
   * @request GET:/api/v1/productListByType/{typeId}
   * @secure
   */
  v1ProductListByTypeDetail = (
    { typeId, ...query }: V1ProductListByTypeDetailParams,
    params: RequestParams = {},
  ) =>
    this.request<
      V1ProductListByTypeDetailData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/productListByType/${typeId}`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags product
   * @name V1AllProductListList
   * @summary Получить список продуктов
   * @request GET:/api/v1/allProductList
   * @secure
   */
  v1AllProductListList = (
    query: V1AllProductListListParams,
    params: RequestParams = {},
  ) =>
    this.request<
      V1AllProductListListData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/allProductList`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags product
   * @name V1ProductByIdDetail
   * @summary Получить продукт по id
   * @request GET:/api/v1/productById/{productId}
   * @secure
   */
  v1ProductByIdDetail = (
    { productId }: V1ProductByIdDetailParams,
    params: RequestParams = {},
  ) =>
    this.request<
      V1ProductByIdDetailData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/productById/${productId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags productInfo
   * @name V1AddProductInfoCreate
   * @summary Добавить информацию о продукте
   * @request POST:/api/v1/addProductInfo
   * @secure
   */
  v1AddProductInfoCreate = (
    data: V1AddProductInfoCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<
      V1AddProductInfoCreateData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/addProductInfo`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags productInfo
   * @name V1UpdateProductInfoPartialUpdate
   * @summary Обновить информацию о продукте
   * @request PATCH:/api/v1/updateProductInfo/{productInfoId}
   * @secure
   */
  v1UpdateProductInfoPartialUpdate = (
    { productInfoId }: V1UpdateProductInfoPartialUpdateParams,
    data: V1UpdateProductInfoPartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<
      V1UpdateProductInfoPartialUpdateData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/updateProductInfo/${productInfoId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags productInfo
   * @name V1RemoveProductInfoDelete
   * @summary Удалить информацию о продукте
   * @request DELETE:/api/v1/removeProductInfo/{productInfoId}
   * @secure
   */
  v1RemoveProductInfoDelete = (
    { productInfoId }: V1RemoveProductInfoDeleteParams,
    params: RequestParams = {},
  ) =>
    this.request<
      V1RemoveProductInfoDeleteData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/removeProductInfo/${productInfoId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags productInfo
   * @name V1ProductInfoListByIdDetail
   * @summary Получить информацию о продукте
   * @request GET:/api/v1/productInfoListById/{productId}
   * @secure
   */
  v1ProductInfoListByIdDetail = (
    { productId }: V1ProductInfoListByIdDetailParams,
    params: RequestParams = {},
  ) =>
    this.request<
      V1ProductInfoListByIdDetailData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/productInfoListById/${productId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags productInfo
   * @name V1AllProductInfoListList
   * @summary Получить список информации о продуктах
   * @request GET:/api/v1/allProductInfoList
   * @secure
   */
  v1AllProductInfoListList = (
    query: V1AllProductInfoListListParams,
    params: RequestParams = {},
  ) =>
    this.request<
      V1AllProductInfoListListData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/allProductInfoList`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags type
   * @name V1AddNameTypeCreate
   * @summary Добавить тип
   * @request POST:/api/v1/addNameType
   * @secure
   */
  v1AddNameTypeCreate = (
    data: V1AddNameTypeCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<
      V1AddNameTypeCreateData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/addNameType`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags type
   * @name V1UpdateTypePartialUpdate
   * @summary Обновить тип
   * @request PATCH:/api/v1/updateType/{typeId}
   * @secure
   */
  v1UpdateTypePartialUpdate = (
    { typeId }: V1UpdateTypePartialUpdateParams,
    data: V1UpdateTypePartialUpdatePayload,
    params: RequestParams = {},
  ) =>
    this.request<
      V1UpdateTypePartialUpdateData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/updateType/${typeId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags type
   * @name V1RemoveTypeDelete
   * @summary Удалить тип
   * @request DELETE:/api/v1/removeType/{typeId}
   * @secure
   */
  v1RemoveTypeDelete = (
    { typeId }: V1RemoveTypeDeleteParams,
    params: RequestParams = {},
  ) =>
    this.request<
      V1RemoveTypeDeleteData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/removeType/${typeId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags type
   * @name V1TypeListList
   * @summary Получить типы
   * @request GET:/api/v1/typeList
   * @secure
   */
  v1TypeListList = (query: V1TypeListListParams, params: RequestParams = {}) =>
    this.request<
      V1TypeListListData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/typeList`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags file
   * @name V1UploadFileCreate
   * @summary Загрузить файл
   * @request POST:/api/v1/uploadFile
   * @secure
   */
  v1UploadFileCreate = (
    data: V1UploadFileCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<
      V1UploadFileCreateData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/uploadFile`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags file
   * @name V1RemoveFileDelete
   * @summary Удалить файл
   * @request DELETE:/api/v1/removeFile/{uuid}
   * @secure
   */
  v1RemoveFileDelete = (
    { uuid }: V1RemoveFileDeleteParams,
    params: RequestParams = {},
  ) =>
    this.request<
      V1RemoveFileDeleteData,
      {
        error?: string;
        message: string;
      }
    >({
      path: `/api/v1/removeFile/${uuid}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
