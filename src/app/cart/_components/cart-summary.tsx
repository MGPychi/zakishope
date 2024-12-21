"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";

export function CartSummary() {
  const { getTotal } = useCart();
  const subtotal = getTotal();
  const shipping = 10.0;
  const total = subtotal + shipping;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-xl">
          Résumé de la commande
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Sous-total</span>
          <span>{subtotal.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between">
          <span>Frais de livraison</span>
          <span>{shipping.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{total.toFixed(2)} €</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-tahat-800 hover:bg-tahat-900 text-white">
          Passer à la caisse
        </Button>
      </CardFooter>
    </Card>
  );
}
