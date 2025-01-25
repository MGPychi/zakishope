// import { ArrowRight } from "lucide-react"

import { getProductsByCategory } from "../data/products-data";
import { ProductCard } from "@/components/cards/product-card/product-card";

interface ProductGridProps {
  products: Awaited<ReturnType<typeof getProductsByCategory>>;
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
