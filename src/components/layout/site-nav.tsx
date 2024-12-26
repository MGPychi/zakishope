import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-select";

const categories = [
  { name: "Accueil", href: "/" },
  { name: "Boutique", href: "/boutique" },
  { name: "Smart Watch", href: "/smart-watch" },
  { name: "Mon compte", href: "/mon-compte" },
];

export function SiteNav() {
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
          <SheetContent side="left">
            <div className="grid gap-4 py-4">
              {categories.map((category) => (
                <>
                  <Link
                    key={category.name}
                    href={category.href}
                    className="block px-2 py-1 text-lg hover:text-tahat-800 transition-colors"
                  >
                    {category.name}
                    
                  </Link>
                  <Separator  />
                </>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
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
