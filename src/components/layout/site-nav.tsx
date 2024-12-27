import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const categories = [
  { name: "Accueil", href: "/" },
  { name: "Boutique", href: "/boutique" },
  { name: "Nouvel Arrivage", href: "/nouvel-arrivage" },
  { name: "Smart Watch", href: "/smart-watch" },
  { name: "Box TV", href: "/box-tv" },
  { name: "Smart Home", href: "/smart-home" },
  { name: "Caméras", href: "/cameras" },
  { name: "Écouteurs", href: "/ecouteurs" },
  { name: "Pour Femme", href: "/pour-femme" },
  { name: "Bracelet & Glass", href: "/bracelet-glass" },
  { name: "Power Bank", href: "/power-bank" },
  { name: "Tablette", href: "/tablette" },
  { name: "Datashow", href: "/datashow" },
  { name: "Car Electronic & GPS", href: "/car-electronic" },
  { name: "Jeux Vidéos", href: "/jeux-videos" },
]


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
          <SheetContent side="left" className="max-h-screen overflow-scroll">
            <h2 className="text-xl font-medium">Categories</h2>
            <div className="grid gap-2 py-4">
              {categories.map((category) => (
                <>
                  <Link
                    key={category.name}
                    href={category.href}
                    className="block px-2 border-b border-gray-200 last:border-b-0 py-2 hover:text-primary  text-lg hover:text-tahat-800 transition-colors"
                  >
                    {category.name}
                    
                  </Link>
                </>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex gap-6">
          {categories.slice(0,8).map((category) => (
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
