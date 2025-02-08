"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ProductCardAddToCart from "./product-card-add-to-cart";
import { getAllFeaturedActiveProducts } from "@/app/data/products-data";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as motion from "motion/react-m"; // Import Framer Motion
import { Badge } from "@/components/ui/badge"; // Import the Badge component

interface ProductCardProps {
  product: Awaited<ReturnType<typeof getAllFeaturedActiveProducts>>[0];
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  let discountedPercentage = 0;
  let hasDiscount = false;
  if (product.discount) {
    hasDiscount = product.price != product.discount;
    discountedPercentage =
      ((product.price - product.discount) / product.price) * 100;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Fade in and slide up
      whileInView={{ opacity: 1, y: 0 }} // Animate into view
      viewport={{ once: true, margin: "-100px" }} // Trigger once and adjust margin
      transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
      whileHover={{ scale: 1.02 }} // Slight scale on hover
      className="w-full"
    >
      <Card className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg h-full flex flex-col relative">
        <CardContent className="p-0 flex-grow flex flex-col">
          <div className="aspect-square m-4 relative overflow-hidden flex items-center justify-center">
            <Link href={`/product/${product.slug}`} passHref>
              <motion.div
                whileHover={{ scale: 1.05 }} // Scale up on hover
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Image
                  src={product?.images?.length > 0 ? product?.images[0]?.url : ""}
                  alt={product.name}
                  width={250}
                  height={250}
                  quality={60}
                  className="object-contain transition-transform group-hover:scale-105"
                />
              </motion.div>
            </Link>
            <ProductCardAddToCart product={product} />
          </div>

          <div className="p-4 flex-grow flex flex-col">
            <Link href={`/product/${product.slug}`} passHref>
              <motion.h3
                initial={{ opacity: 0, y: 10 }} // Fade in and slide up
                whileInView={{ opacity: 1, y: 0 }} // Animate into view
                viewport={{ once: true, margin: "-50px" }} // Trigger once
                transition={{ duration: 0.5, delay: 0.2 }} // Delay for staggered effect
                className="font-medium line-clamp-2 mb-2 text-lg text-gray-800 min-h-[3rem]"
              >
                {product.name}
              </motion.h3>
            </Link>

            {!hasDiscount && (
              <motion.div
                initial={{ opacity: 0, y: 10 }} // Fade in and slide up
                whileInView={{ opacity: 1, y: 0 }} // Animate into view
                viewport={{ once: true, margin: "-50px" }} // Trigger once
                transition={{ duration: 0.5, delay: 0.3 }} // Delay for staggered effect
                className="flex items-baseline gap-2 mt-auto"
              >
                <span className="text-2xl font-bold text-primary">
                  {product.price.toFixed(0)} DZD
                </span>
              </motion.div>
            )}
            {hasDiscount && (
              <motion.div
                initial={{ opacity: 0}} // Fade in and slide up
                whileInView={{ opacity: 1}} // Animate into view
                viewport={{ once: true}} // Trigger once
                transition={{ duration: 0.5, delay: 0.3 }} // Delay for staggered effect
                className="flex items-baseline gap-2 mt-auto"
              >
                <span className="text-2xl font-bold text-primary">
                  {product.price.toFixed(2)} DZD
                </span>
                {product.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    {product.price.toFixed(2)} DZD
                  </span>
                )}
              </motion.div>
            )}
            {hasDiscount && (
              <motion.div
                viewport={{ once: true}} // Trigger once
                transition={{ type: "spring", stiffness: 260, damping: 20 }} // Spring animation
              >
                <Badge className="mt-2 bg-primary hover:bg-primary/80">
                  {discountedPercentage.toFixed(0)}% Off
                </Badge>
              </motion.div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4">
          <Link
            onClick={(e) => {
              e.stopPropagation();
              router.push("/confirm-order?productId=" + product.id);
            }}
            className="block w-full"
            href={`/confirm-order?productId=${product.id}`}
            passHref
          >
            <motion.div
              initial={{  opacity: 0 }} // Fade in and slide up
              whileInView={{  opacity: 1 }} // Animate into view
              viewport={{ once: true}} // Trigger once
              transition={{ duration: 0.5, delay: 0.4 }} // Delay for staggered effect
              className="w-full"
            >
              <Button
                className={cn(
                  "w-full flex items-center justify-center gap-2 transition-colors duration-300"
                )}
              >
                Acheter Maintenant
              </Button>
            </motion.div>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}