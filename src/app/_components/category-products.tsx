import { getProductsByCategory } from "../data/products-data"
import { CategorySection } from "./category-section"
import { ProductGrid } from "./product-grid"

interface CategoryProductsProps {
  title: string
  categorySlug: string
}

export async function CategoryProducts({ title, categorySlug }: CategoryProductsProps) {
  const products = await getProductsByCategory(categorySlug)
  if(products.length === 0) return <></>
  return (
    <CategorySection slug={categorySlug} title={title}>
      <ProductGrid products={products} />
    </CategorySection>
  )
}

