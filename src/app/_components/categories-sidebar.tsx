import Link from "next/link"

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

export function CategoriesSidebar() {
  return (
    <div className="w-full hidden lg:block">
      {/* <div className="bg-tahat-800   flex items-center gap-2"> */}
        {/* <span className="text-lg  font-medium">Categories</span> */}
      {/* </div> */}
      <div className="border border-gray-200">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-200 last:border-b-0"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

