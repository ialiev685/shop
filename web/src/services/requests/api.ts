import { api } from "../client";
import type {
  V1AddNameTypeCreatePayload,
  V1AddProductCreatePayload,
  V1AddProductToBasketCreatePayload,
  V1AllProductListListParams,
  V1ProductByIdDetailParams,
  V1ProductListByTypeDetailParams,
  V1RemoveProductDeleteParams,
  V1RemoveProductFromBasketCreatePayload,
  V1RemoveTypeDeleteParams,
  V1TypeListListParams,
  V1UpdateQuantityProductCreatePayload,
} from "../data-contracts";

export const productListAll = async (params: V1AllProductListListParams) => {
  const { data } = await api.v1AllProductListList(params);
  return data;
};

export const productById = async (params: V1ProductByIdDetailParams) => {
  const { data } = await api.v1ProductByIdDetail(params);
  return data;
};

export const productListByType = async (
  params: V1ProductListByTypeDetailParams,
) => {
  const { data } = await api.v1ProductListByTypeDetail(params);
  return data;
};

export const addProduct = async (params: V1AddProductCreatePayload) => {
  const { data } = await api.v1AddProductCreate(params);
  return data;
};

export const removeProduct = async (params: V1RemoveProductDeleteParams) => {
  const { data } = await api.v1RemoveProductDelete(params);
  return data;
};

export const typeList = async (params: V1TypeListListParams) => {
  const { data } = await api.v1TypeListList(params);
  return data;
};

export const addType = async (params: V1AddNameTypeCreatePayload) => {
  const { data } = await api.v1AddNameTypeCreate(params);
  return data;
};

export const removeType = async (params: V1RemoveTypeDeleteParams) => {
  const { data } = await api.v1RemoveTypeDelete(params);
  return data;
};

export const basketProductList = async () => {
  const { data } = await api.v1BasketListList();
  return data;
};

export const addProductToBasket = async (
  params: V1AddProductToBasketCreatePayload,
) => {
  const { data } = await api.v1AddProductToBasketCreate(params);
  return data;
};

export const updateQuantityProductFromBasket = async (
  params: V1UpdateQuantityProductCreatePayload,
) => {
  const { data } = await api.v1UpdateQuantityProductCreate(params);
  return data;
};

export const deleteProductFromBasket = async (
  params: V1RemoveProductFromBasketCreatePayload,
) => {
  const { data } = await api.v1RemoveProductFromBasketCreate(params);
  return data;
};
