// import { CategoriesSidebar } from "./_components/categories-sidebar"
import { FeaturedProducts } from "./_components/feature-products"
import { HeroCarousel } from "./_components/hero-carousel"
import { NewArrivals } from "./_components/new-arrivals"
import { PopularCategories } from "./_components/popular-categories"
import { SpecialOffers } from "./_components/special-offers"
import { Brands } from "./_components/brands"
import { SiteHeader } from "../components/layout/site-header/site-header"
import { SiteNav } from "../components/layout/site-nav"

export default function Home() {
  return (
    <div className="min-h-screen container mx-auto max-w-screen-2xl bg-background">
      <SiteHeader />
      <SiteNav />
      <div className="container py-4">
        <div className="">
          <aside>
          </aside>
          <main className="space-y-8 px-10">
            <HeroCarousel />
            <FeaturedProducts />
            <NewArrivals />
            <PopularCategories />
            <SpecialOffers />
            <Brands />
          </main>
        </div>
      </div>
    </div>
  )
}

