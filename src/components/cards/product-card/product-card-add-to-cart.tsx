"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/interfaces/CartItem";
import { cn } from "@/lib/utils";
import { ShoppingBasket } from "lucide-react";
import React from "react";
interface Props {
  product: Product;
}
const ProductCardAddToCart = ({ product }: Props) => {
  const { isInCart, addItem, removeItem } = useCart();

  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    if (!inCart){ 
        addItem({ item: product, qt: 1 });}

    else removeItem(product.id);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "absolute top-2 right-2 rounded-full transition-colors duration-300",
        inCart
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-white text-gray-600 hover:bg-gray-100"
      )}
      onClick={handleAddToCart}
    >
      <ShoppingBasket
        size={18}
        className={cn("h-4 w-4", inCart && "fill-current")}
      />
      <span className="sr-only">
        {inCart ? "Remove from menu" : "Add to menu"}
      </span>
    </Button>
  );
};

export default ProductCardAddToCart;
