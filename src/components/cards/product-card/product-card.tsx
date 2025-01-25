"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ProductCardAddToCart from "./product-card-add-to-cart";
// import Link from "next/link";
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
      className="flex cursor-pointer flex-col overflow-hidden transition-all duration-300 hover:shadow-lg h-full"
    >
      <CardContent className="p-0 flex-grow">
        <div className="relative">
          <Image
            src={product?.images?.length > 0 ? product.images[0].url : ""}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover"
          />
          <ProductCardAddToCart product={product} />
        </div>
        <div className="p-4">
          {/* <Link href={`/product/${product.slug}`}> */}
          <h3 className="text-lg hover:text-primary font-semibold text-gray-800 line-clamp-2 mb-2">
            {product.name}
          </h3>
          {/* </Link> */}
          <p className="text-lg font-semibold text-tahat-600">
            {product.price} DZD
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 mt-auto">
        <Link onClick={(e)=>{
          e.stopPropagation()
          router.push("/confirm-order?productId="+product.id)
        }} className="block w-full"  href={`/confirm-order?productId=${product.id}`} passHref>
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
