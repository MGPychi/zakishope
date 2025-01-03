import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { getAllFeaturedCategories } from "../data/categories-data";

export async function PopularCategories() {
  const categories = await getAllFeaturedCategories();

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Catégories Populaires</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <Link key={index} href={`/product/category=${category.slug}`}>
            <Card className="group h-full">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="relative w-full aspect-square mb-3">
                  <Image
                    src={category.image ?? ""}
                    alt={category.name}
                    fill
                    className="object-cover rounded-md group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.products_count}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
