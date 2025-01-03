import { ProductCard } from "@/components/cards/product-card/product-card";
import { SearchFilters } from "./components/search-filters";
import { SearchHeader } from "./components/search-header";
import { searchAndFilterInAllProducts } from "../data/products-data";
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
    categories: string;
  };
}) {
  const {
    q,
    priceMin,
    priceMax,
    order,
    categories: categoriesParam,
  } = searchParams;
const selectedCategories = categoriesParam ? categoriesParam.split("__") : [];
const allCategories = await getAllCategories();


console.log("selected",selectedCategories)
// Obtain a list of selected category IDs based on the names
const selectedCategoriesIds = selectedCategories.map((categoryName) => {
    console.log(categoryName)
    const category = allCategories.find((cat) => {
        console.log("the ",cat.name,categoryName,cat.name==categoryName)
        return cat.name === categoryName
    });
    console.log("found",category)
    return category ? category.id : null;
}).filter((id) => id !== null);

// Parse and validate priceMin and priceMax
  const parsedPriceMin = priceMin ? parseFloat(priceMin) : undefined;
  const parsedPriceMax = priceMax ? parseFloat(priceMax) : undefined;

  if (parsedPriceMin !== undefined && isNaN(parsedPriceMin)) {
    throw new Error("Invalid priceMin value");
  }

  if (parsedPriceMax !== undefined && isNaN(parsedPriceMax)) {
    throw new Error("Invalid priceMax value");
  }
  console.log(selectedCategories)
  console.log(selectedCategoriesIds)

  const products = await searchAndFilterInAllProducts({
    q,
    minPrice: parsedPriceMin,
    maxPrice: parsedPriceMax,
    categories: selectedCategoriesIds,
    sortByPrice: order,
  });

  return (
    <div className="container mx-auto max-w-screen-2xl ">
      <SiteHeader />

      <main>
        <div className="container mx-auto px-4 py-8">
          <SearchHeader />

          <div className="flex flex-col md:flex-row gap-6">
            <SearchFilters categories={allCategories} />

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
