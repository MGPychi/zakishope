"use client";
import { Button } from "@/components/ui/button";
import { selectProductSchema } from "@/db/schema";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import { ShoppingBasket } from "lucide-react";
import React from "react";
import { z } from "zod";
interface Props {
  product: z.infer<typeof selectProductSchema> & {
    images: { url: string }[];
  };
}
const ProductCardAddToCart = ({ product }: Props) => {
  const { isInCart, addItem, removeItem } = useCart();

  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    if (!inCart) {
      const productWithDiscount = {...product,price:product.discount??product.price}
      addItem({ item: productWithDiscount, qt: 1 });
    } else removeItem(product.id);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "absolute top-2 w-12 h-12 right-2 rounded-full transition-colors duration-300",
        inCart
          ? "bg-blue-500 text-white hover:text-blue-600 hover:ring-2"
          : "bg-white text-gray-600 hover:text-blue-600  hover:ring-2"
      )}
      onClick={(e) => {
        e.stopPropagation();
        handleAddToCart();
      }}
    >
      <ShoppingBasket
        size={20}
        className={cn("!h-5 !w-5", inCart && "fill-current")}
      />
      <span className="sr-only">
        {inCart ? "Remove from menu" : "Add to menu"}
      </span>
    </Button>
  );
};

export default ProductCardAddToCart;
