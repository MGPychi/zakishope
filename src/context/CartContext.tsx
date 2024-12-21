"use client";
import CartItem from "@/interfaces/CartItem";
import { createContext, ReactNode, useEffect, useState } from "react";

interface CartType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qt: number, override?: boolean) => void;
  clearCart: () => void;
  isLoading:boolean;
  isInCart: (id: string) => boolean;
  getTotal: () => number;
}
const initialState: CartType = {
  items: [],
  isLoading:true,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  isInCart: () => false,
  getTotal: () => 0,
};

export const cartContext = createContext(initialState);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState(initialState.items);
  const [isLoading,setIsLoading]=useState(initialState.isLoading)

  const addItem = (item: CartItem) => {
    setItems((prev) => [...prev, item]);
  };
  const getTotal = () => {
    let total = 0;
    for (const item of items) total += item.item.price * item.qt;
    return total;
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.item.id != id));
  };
  const updateQuantity = (id: string, qt: number, override?: boolean) => {
    if (override) {
      if (qt <= 0) qt = 1;
      console.log(qt);
      setItems((prev) =>
        prev.map((i) => {
          if (i.item.id == id && i.qt >= 1) return { ...i, qt };
          return { ...i };
        })
      );
      return;
    }
    setItems((prev) =>
      prev.map((i) => {
        const newQt = i.qt + qt;
        console.log(newQt);
        if (i.item.id == id && i.qt + qt >= 1) return { ...i, qt: newQt };
        return { ...i };
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
    setIsLoading(false)
  }, []);
  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    if (items.length != 0) {
      timeOut = setTimeout(
        () => localStorage.setItem("cart", JSON.stringify(items)),
        100
      );
    }
    return () => clearTimeout(timeOut);
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
    isLoading,
    updateQuantity,
    clearCart,
    isInCart,
    getTotal
  };
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
