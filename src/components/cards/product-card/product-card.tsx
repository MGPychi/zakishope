import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ProductCardAddToCart from "./product-card-add-to-cart";
import { Product } from "@/interfaces/CartItem";

interface ProductCardProps {
  product:Product
}

export function ProductCard({product}:ProductCardProps) {


  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover"
          />
          <ProductCardAddToCart product={product} />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
            {product.name}
          </h3>
          <p className="text-xl font-bold text-tahat-600">{product.price}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button
          className={cn(
            "w-full flex items-center justify-center gap-2 transition-colors duration-300",
          )}
        >
           Bay Now 
        </Button>
      </CardFooter>
    </Card>
  );
}
