import { productQueries } from "@/entities/product";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { productInfoQueries } from "@/entities/product-info/api/product-info-queries";

export const useController = () => {
  const { id } = useParams();
  const location = useLocation();

  const productQuery = useQuery({
    ...productQueries.getById(Number(id)),
    enabled: Boolean(id),
  });

  const productInfoQuery = useQuery({
    ...productInfoQueries.getById(productQuery.data?.id ?? NaN),
    enabled: Boolean(productQuery.data?.id),
  });

  return {
    product: productQuery.data,
    productInfo: productInfoQuery.data,
    isLoading: productQuery.isLoading || productInfoQuery.isLoading,
    title: location.state?.title,
  };
};
