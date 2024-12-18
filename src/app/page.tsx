import { FeaturedProducts } from "./components/feature-products";
import { HeroSection } from "./components/hero-section";
import { ProductCategories } from "./components/product-categories";
import { SiteHeader } from "./components/site-header";
import { SiteNav } from "./components/site-nav";

export default function Home() {
  return (
    <div className="min-h-screen container mx-auto max-w-screen-xl bg-background">
      <SiteHeader />
      <SiteNav />
      <main>
        <HeroSection />
        <ProductCategories />
        <FeaturedProducts />
      </main>
    </div>
  )
}

