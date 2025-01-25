import { ProductCard } from "@/components/cards/product-card/product-card";
import { SearchFilters } from "./components/search-filters";
// import { SearchHeader } from "./components/search-header";
import { getProductMarks, searchAndFilterInAllProducts } from "../data/products-data";
import { getAllCategories } from "../data/categories-data";
import { SiteHeader } from "@/components/layout/site-header/site-header";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {
    q?: string;
    priceMin?: string;
    priceMax?: string;
    orderBy?: "price" | "date";
    order?: "asc" | "desc";
    category: string;
    mark:string;
  };
}) {
  const {
    q,
    priceMin,
    priceMax,
    mark,
    order,
    category: categoriesParam,
  } = searchParams;
const selectedCategorySlugs = categoriesParam ? categoriesParam.split("_or_") : [];
const selectedMarks  = mark ? mark.split("_or_"):[]
const allCategories = await getAllCategories();
const marks = await getProductMarks()



// Parse and validate priceMin and priceMax
  const parsedPriceMin = priceMin ? parseFloat(priceMin) : undefined;
  const parsedPriceMax = priceMax ? parseFloat(priceMax) : undefined;

  if (parsedPriceMin !== undefined && isNaN(parsedPriceMin)) {
    throw new Error("Invalid priceMin value");
  }

  if (parsedPriceMax !== undefined && isNaN(parsedPriceMax)) {
    throw new Error("Invalid priceMax value");
  }

  const products = await searchAndFilterInAllProducts({
    q,
    minPrice: parsedPriceMin,
    maxPrice: parsedPriceMax,
    categories: selectedCategorySlugs,
    sortByPrice: order,
    marks:selectedMarks

  });

  return (
    <div className="container mx-auto max-w-screen-2xl ">
      <SiteHeader />

      <main>
        <div className="container mx-auto px-4 py-8">
          {/* <SearchHeader /> */}

          <div className="flex flex-col md:flex-row gap-6">
            <SearchFilters marks={marks} categories={allCategories} />

            {/* Product Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
