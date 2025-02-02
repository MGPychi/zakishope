import { ProductCard } from "@/components/cards/product-card/product-card";
import { SearchFilters } from "./components/search-filters";
import {
  getProductMarks,
  searchAndFilterInAllProducts,
} from "../data/products-data";
import { getAllCategories } from "../data/categories-data";
import { SiteHeader } from "@/components/layout/site-header/site-header";
import Footer from "@/components/layout/Footer/Footer";
import Container from "@/components/layout/Container";
import { Search} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Résultats de Recherche - Trouvez Vos Électroménagers - WorldTech Constantine",
};

interface SearchParams {
  q?: string;
  priceMin?: string;
  priceMax?: string;
  mark?: string;
  order?: string;
  category?: string;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const {
    q,
    priceMin,
    priceMax,
    mark,
    order,
    category: categoriesParam,
  } = searchParams;
  const selectedCategorySlugs = categoriesParam
    ? categoriesParam.split("_or_")
    : [];
  const selectedMarks = mark ? mark.split("_or_") : [];
  const allCategories = await getAllCategories();
  const marks = await getProductMarks();
  const parsedPriceMin = priceMin ? parseFloat(priceMin) : undefined;
  const parsedPriceMax = priceMax ? parseFloat(priceMax) : undefined;
  const products = await searchAndFilterInAllProducts({
    q,
    minPrice: parsedPriceMin,
    maxPrice: parsedPriceMax,
    categories: selectedCategorySlugs,
    sortByPrice: order === "desc" || order === "asc" ? order : undefined,
    marks: selectedMarks,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="w-full pt-10 px-2 sm:px-0">
        <Container>
          <div className="md:hidden flex  w-full mb-4">
            <SearchFilters  marks={marks} categories={allCategories} />
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="hidden md:block w-64 shrink-0">
              <SearchFilters marks={marks}  categories={allCategories} />
            </div>

            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                  {products.length} Produit{products.length !== 1 ? "s" : ""}{" "}
                  trouvé{products.length !== 1 ? "s" : ""}
                  {q && ` pour "${q}"`}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[200px]">
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
