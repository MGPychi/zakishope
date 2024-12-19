import { CategoriesSidebar } from "./components/categories-sidebar";
import { FeaturedProducts } from "./components/feature-products";
import { HeroCarousel } from "./components/hero-carousel";
// import { ProductCategories } from "./components/product-categories";
import { SiteHeader } from "./components/site-header";
import { SiteNav } from "./components/site-nav";

export default function Home() {
  return (
    <div className="min-h-screen container mx-auto max-w-screen-2xl bg-background">
      <SiteHeader />
      <SiteNav />
      <div className="container py-4">
        <div className="grid lg:grid-cols-[280px,1fr] gap-6">
          <aside>
            <CategoriesSidebar />
          </aside>
          <main>
            <HeroCarousel />
            <FeaturedProducts />
          </main>
        </div>
      </div>
    </div>
  )
}

