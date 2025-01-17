import { ProductCard } from "../../components/cards/product-card/product-card";
import { getAllFeaturedActiveProducts } from "../data/products-data";


export async function FeaturedProducts() {
  const featuredProducts  = await getAllFeaturedActiveProducts()
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Produits Vedettes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
