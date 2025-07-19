"use client";
import { Button } from "@/components/ui/button";
import { selectProductSchema } from "@/db/schema";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import { getFinalPrice } from "@/utils/product-utils";
import { ShoppingBasket } from "lucide-react";
import React from "react";
import { z } from "zod";
interface Props {
  product: z.infer<typeof selectProductSchema> & {
    images: { url: string }[];
  };
}
const AddProductToCart = ({ product }: Props) => {
  const { isInCart, addItem, removeItem } = useCart();

  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    if (!inCart) {
      const productWithDiscount = {
        ...product,
        price: getFinalPrice(product.price, product.discount),
      };
      addItem({ item: productWithDiscount, qt: 1 });
    } else removeItem(product.id);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "orounded-full h-10 w-16  transition-colors duration-300",
        inCart
          ? "ring-blue-500 ring-2 text-blue-500 hover:text-blue-600 hover:ring-2"
          : "bg-white text-gray-600 hover:text-blue-600  hover:ring-2"
      )}
      onClick={(e) => {
        e.stopPropagation();
        handleAddToCart();
      }}
    >
      <ShoppingBasket
        size={40}
        className={cn("!h-5 !w-5", inCart && "fill-current")}
      />
      <span className="sr-only">
        {inCart ? "Remove from menu" : "Add to menu"}
      </span>
    </Button>
  );
};

export default AddProductToCart;
