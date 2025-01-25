"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";

const ConfirmCommandButton = () => {
  const { items } = useCart();

  return (
    <Button
      asChild
      disabled={items.length === 0}
      className={`w-full ${items.length === 0 && "disabled"}`}
    >
      {items.length > 0 ? (
        <Link href="/confirm-order" passHref>
          Passer la commande
        </Link>
      ) : (
        "Passer la commande"
      )}
    </Button>
  );
};

export default ConfirmCommandButton;
