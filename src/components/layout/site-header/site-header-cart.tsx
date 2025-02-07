"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { ShoppingBag } from "lucide-react";
import * as motion from "motion/react-m";
import { useEffect, useState } from "react";

const SiteHeaderCart = () => {
  const { items } = useCart();
  const [itemCount, setItemCount] = useState(items.length);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (items.length !== itemCount) {
      setAnimate(true);
      setItemCount(items.length);
    }
  }, [items.length, itemCount]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative text-gray-600 hover:text-tahat-800"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ShoppingBag className="h-5 w-5" />
      </motion.div>
      <motion.span
        className="absolute bg-primary -top-1 -right-1 h-4 w-4 rounded-full bg-tahat-800 text-xs text-white flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={animate ? { scale: [1.2, 1] } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        onAnimationComplete={() => setAnimate(false)}
      >
        {items.length}
      </motion.span>
    </Button>
  );
};

export default SiteHeaderCart;
