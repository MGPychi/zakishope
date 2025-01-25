"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ProductCardAddToCart from "./product-card-add-to-cart";
import { getAllFeaturedActiveProducts } from "@/app/data/products-data";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProductCardProps {
  product: Awaited<ReturnType<typeof getAllFeaturedActiveProducts>>[0];
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`/product/${product.slug}`)}
      className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg h-full"
    >
      <CardContent className="p-0">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={product?.images?.length > 0 ? product.images[0].url : "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <ProductCardAddToCart product={product} />
        </div>
        <div className="p-4">
          <h3 className="font-medium line-clamp-2 mb-2 text-lg text-gray-800">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">
              {product.price.toFixed(2)} DZD
            </span>
            {product.price && (
              <span className="text-sm text-muted-foreground line-through">
                {product.price.toFixed(2)} DZD
              </span>
            )}
          </div>
          {product.price && (
            <p className="text-sm text-primary mt-1">{product.price}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 mt-auto">
        <Link
          onClick={(e) => {
            e.stopPropagation();
            router.push("/confirm-order?productId=" + product.id);
          }}
          className="block w-full"
          href={`/confirm-order?productId=${product.id}`}
          passHref
        >
          <Button
            className={cn(
              "w-full flex items-center justify-center gap-2 transition-colors duration-300"
            )}
          >
            Acheter Maintenant
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
