import { Counter } from "@/shared/ui/counter";
import { Box, Button, type ButtonProps } from "@mantine/core";
import { useController } from "./model";
import { LoadingOverlay } from "@mantine/core";

interface AddProductToBasketControl extends ButtonProps {
  productId: number;
}

export const AddProductToBasketControl = ({
  productId,
  variant = "outline-green-shop",
  ...otherProps
}: AddProductToBasketControl) => {
  const {
    foundProductInBasket,
    isLoading,
    handleAddToBasket,
    handleUpdateQuantity,
    handleDeleteProductFromBasket,
  } = useController({ productId });

  return (
    <Box>
      <LoadingOverlay visible={isLoading} />
      {foundProductInBasket ? (
        <Counter
          quantity={foundProductInBasket.quantity}
          onUpdateQuantity={(quantity) =>
            handleUpdateQuantity({
              quantity,
              productId,
              basketId: foundProductInBasket.basketId,
            })
          }
          onDelete={() =>
            handleDeleteProductFromBasket(
              foundProductInBasket.productId,
              foundProductInBasket.basketId,
            )
          }
        />
      ) : (
        <Button
          {...otherProps}
          w="100%"
          variant={variant}
          onClick={(event) => {
            event.stopPropagation();
            handleAddToBasket(productId);
          }}
        >
          В корзину
        </Button>
      )}
    </Box>
  );
};
