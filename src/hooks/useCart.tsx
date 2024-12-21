"use client";
import { cartContext } from "@/context/CartContext";
import { useContext } from "react";


export const   useCart  =()=>  useContext(cartContext)