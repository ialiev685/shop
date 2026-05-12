import { BasketCard } from "@/entities/basket-products/ui/basket-card";
import { AddProductToBasketControl } from "@/features/add-product--to-basket-control/ui";
import { useController } from "./model";
import { PageLayout } from "@/shared/ui/page-layout/ui";

export const Basket = () => {
  const { data, handleDeleteQuantity, isLoading } = useController();

  return (
    <PageLayout title="Корзина" pathBack="/catalog">
      {data?.basketProducts.map((basketProduct) => (
        <BasketCard
          isLoading={isLoading}
          key={basketProduct.id}
          basketProduct={basketProduct}
          onDelete={handleDeleteQuantity}
          control={
            <AddProductToBasketControl productId={basketProduct.productId} />
          }
        />
      ))}
    </PageLayout>
  );
};
