"use client";
import CartItem from "@/interfaces/CartItem";
import { createContext, ReactNode, useEffect, useState } from "react";

interface CartType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qt: number) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
}
const initialState: CartType = {
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  isInCart: () => false,
};

export const cartContext = createContext(initialState);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState(initialState.items);

  const addItem = (item: CartItem) => {
    console.log(item);
    setItems((prev) => [...prev, item]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.item.id != id));
  };
  const updateQuantity = (id: string, qt: number) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.item.id != id) return i;
        return { ...i, quantity: i.qt + qt };
      })
    );
  };
  const clearCart = () => {
    setItems([]);
  };
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setItems(JSON.parse(cart));
    }
  }, []);
  useEffect(() => {
    if (items.length != 0) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items]);
  const isInCart = (id: string) => {
    for (const i of items) {
      if (i.item.id == id) return true;
    }
    return false;
  };

  const value: typeof initialState = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
  };
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
