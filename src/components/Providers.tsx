"use client";
import { CartProvider } from "@/context/CartContext";
import { AppProgressBar } from "next-nprogress-bar";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AppProgressBar options={{ showSpinner: false }} />
      <CartProvider>
        <SessionProvider>{children}</SessionProvider>
      </CartProvider>
    </>
  );
};

export default Providers;
