// import { CategoriesSidebar } from "./_components/categories-sidebar"
import { FeaturedProducts } from "./_components/feature-products";
import { HeroCarousel } from "./_components/hero-carousel";
import { NewArrivals } from "./_components/new-arrivals";
import { PopularCategories } from "./_components/popular-categories";
// import { SpecialOffers } from "./_components/special-offers";
// import { Brands } from "./_components/brands"
import { SiteHeader } from "../components/layout/site-header/site-header";
import { SiteNav } from "../components/layout/site-nav";
import Footer from "@/components/layout/Footer/Footer";
import { WhyChooseUs } from "./_components/WhyUs";
import Container from "@/components/layout/Container";
import { CategoryProducts } from "./_components/category-products";
import { getAllFeaturedActiveCategories } from "./data/categories-data";

export default async function Home() {
  const featuredCategories = await getAllFeaturedActiveCategories();
  return (
    <>
      {/* <div> */}

      <SiteHeader />
      <Container>
        <SiteNav />
        <main className="space-y-8 px-1  ">
          <HeroCarousel />
          <FeaturedProducts />
          <NewArrivals />
          <PopularCategories />
          {/* <SpecialOffers /> */}
          {featuredCategories.map((category) => (
            <CategoryProducts
              key={category.id}
              categorySlug={category.slug}
              title={category.name}
            />
          ))}
          <WhyChooseUs />

          {/* <Brands /> */}
        </main>
      </Container>
      <Footer />
    </>
  );
}
