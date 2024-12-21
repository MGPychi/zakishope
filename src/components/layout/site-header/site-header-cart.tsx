"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { ShoppingBag } from "lucide-react";
import React from "react";
const SiteHeaderCart = () => {
    const {items} = useCart()
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative text-gray-600 hover:text-tahat-800"
    >
      <ShoppingBag className="h-5 w-5" />
      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-tahat-800 text-xs text-white flex items-center justify-center">
        {items.length}
      </span>
    </Button>
  );
};

export default SiteHeaderCart;
