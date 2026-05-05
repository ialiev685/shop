import { api } from "../client";
import type {
  V1AddNameTypeCreatePayload,
  V1AddProductCreatePayload,
  V1ProductListByTypeDetailParams,
  V1RemoveProductDeleteParams,
  V1RemoveTypeDeleteParams,
} from "../data-contracts";

export const productListAll = async () => {
  const { data } = await api.v1AllProductListList();
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

export const typeList = async () => {
  const { data } = await api.v1TypeListList();
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
