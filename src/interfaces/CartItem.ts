import { selectProductSchema } from "@/db/schema";
import { z } from "zod";
import { getFinalPrice } from "@/utils/product-utils";

export default interface CartItem {
  qt: number;
  item: z.infer<typeof selectProductSchema> & {
    images: { url: string }[];
  };
}
export interface Product {
  name: string;
  image: string;
  id: string;
  price: number;
  discount?: number | null;
}

// Helper function to get the correct price for a cart item (with discount applied if available)
export function getCartItemPrice(item: CartItem): number {
  return getFinalPrice(item.item.price, item.item.discount) * item.qt;
}

// Helper function to calculate the total price of a cart
export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    return total + getCartItemPrice(item);
  }, 0);
}
