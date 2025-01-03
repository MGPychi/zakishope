import Link from "next/link"
import { getAllCategories } from "../data/categories-data"


export async function CategoriesSidebar() {
  const categories = await getAllCategories()
  return (
    <div className="w-full hidden lg:block">
      {/* <div className="bg-tahat-800   flex items-center gap-2"> */}
        {/* <span className="text-lg  font-medium">Categories</span> */}
      {/* </div> */}
      <div className="border border-gray-200">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/product/?category=${category.slug}`}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-200 last:border-b-0"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

