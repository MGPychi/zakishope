import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getAllCategories } from "@/app/data/categories-data";

export async function SiteNav() {
  const categories = await getAllCategories();
  return (
    <nav className="border-b bg-white">
      <div className="container flex h-14 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="mr-4 border-tahat-800 text-tahat-800 hover:bg-tahat-50"
            >
              <Menu className="h-4 w-4 mr-2" />
              <span className="font-medium">Categories</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="max-h-screen overflow-scroll">
            <h2 className="text-xl font-medium">Categories</h2>
            <div className="grid gap-2 py-4">
              {categories.map((category) => (
                <>
                  <Link
                    key={category.name}
                    href={`/product/?category=${category.slug}`}
                    className="block px-2 border-b border-gray-200 last:border-b-0 py-2 hover:text-primary  text-lg hover:text-tahat-800 transition-colors"
                  >
                    {category.name}
                  </Link>
                </>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="md:hidden  flex    gap-6 ">
          {categories.slice(0, 2).map((category) => (
            <Link
              key={category.name}
              href={`/product/?category=${category.slug}`}
              className="text-sm font-medium transition-colors hover:text-tahat-800"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="lg:hidden md:flex hidden gap-6  ">
          {categories.slice(0, 4).map((category) => (
            <Link
              key={category.name}
              href={`/product/?category=${category.slug}`}
              className="text-sm font-medium transition-colors hover:text-tahat-800"
            >
              {category.name}
            </Link>
          ))}
        </div>
        <div className="lg:flex gap-6 hidden ">
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category.name}
              href={`/product/?category=${category.slug}`}
              className="text-sm font-medium transition-colors hover:text-tahat-800"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
