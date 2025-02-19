import { ProductCard } from "@/components/cards/product-card/product-card";
import { SiteHeader } from "@/components/layout/site-header/site-header";
import Footer from "@/components/layout/Footer/Footer";
import Container from "@/components/layout/Container";
import { Search } from "lucide-react";
import { Metadata } from "next";
import { getCategoryDetailWithSlug } from "@/app/data/categories-data";
import { searchAndFilterInAllProducts } from "@/app/data/products-data";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title:
    "Résultats de Recherche - Trouvez Vos Électroménagers - WorldTech Constantine",
};

export default async function SearchPage({
  params,
//   searchParams,
}: {
  params: { category: string };
//   searchParams :{page?:string}
}) {
  const category = await getCategoryDetailWithSlug(params.category);
  if (!category) {
    return notFound();
  }
//   const page = parseInt(searchParams.page ??"1")
  const products = await searchAndFilterInAllProducts({
    categories: [category.slug],

  });

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="w-full pt-10 px-2 sm:px-0">
        <Container>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                  {products.length} Produit{products.length !== 1 ? "s" : ""}{" "}
                  trouvé{products.length !== 1 ? "s" : ""}
                  {category && ` pour "${category.name}"`}
                </h1>
              </div>

              {products.length === 0 && (
                <div className="flex h-1/2 flex-col items-center justify-center py-16  rounded-lg">
                  <Search className="h-16 w-16 text-gray-400 mb-6" />
                  <p className="text-xl font-semibold text-gray-700 mb-2">
                    Aucun produit trouvé
                  </p>
                  <p className="text-lg text-gray-500">
                    Essayez différents filtres de recherche.
                  </p>
                </div>
              )}

              <div className="mx-auto max-w-screen-xl pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[200px]">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
