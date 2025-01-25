"use client";
import { CartProvider } from "@/context/CartContext";
import { AppProgressBar } from "next-nprogress-bar";
import React, { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AppProgressBar options={{ showSpinner: true }} />
      <CartProvider>{children}</CartProvider>
    </>
  );
};

export default Providers;
