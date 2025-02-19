import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/layout/site-header/site-header";
import { ImageGallery } from "./components/ImageGallery";
import {
  getAllProducts,
  getProductDetailWithSlug,
} from "@/app/data/products-data";
import AddProductToCart from "./components/AddProductToCart";
import Footer from "@/components/layout/Footer/Footer";
import { Metadata, ResolvingMetadata } from "next";
import { SiteNav } from "@/components/layout/site-nav";
type Params = Promise<{ slug: string }>;
export async function generateMetadata(
  { params }: { params: Params },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  const product = await getProductDetailWithSlug(slug);

  if (!product) {
    return {
      title: "Produit non trouvé - WorldTech",
      description:
        "Le produit recherché est introuvable. Découvrez notre gamme d'électroménagers sur WorldTech Constantine.",
    };
  }

  const previousImages = (await parent)?.openGraph?.images || [];

  return {
    title: `${product.name} - ${product.category.name} à Constantine | Acheter en Ligne - WorldTech`,
    description: `Achetez le ${product.name} de la catégorie ${product.category.name} à Constantine sur WorldTech. Profitez d'une livraison rapide et d'une qualité garantie pour tous vos besoins en électroménager.`,
    openGraph: {
      title: `${product.name} - ${product.category.name} à Constantine | Acheter en Ligne - WorldTech`,
      description: `Achetez le ${product.name} de la catégorie ${product.category.name} à Constantine sur WorldTech. Profitez d'une livraison rapide et d'une qualité garantie pour tous vos besoins en électroménager.`,
      images: [...previousImages, { url: product.images[0]?.url || "" }],
    },
  };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetail({ params }: { params: Params }) {
  const slug = (await params).slug;
  const product = await getProductDetailWithSlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <div className="max-w-screen-2xl mx-auto container">
        <SiteNav />
      </div>
      <main className="min-h-screen md:pt-14 container mx-auto max-w-screen-2xl bg-background px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-10">
          <ImageGallery images={product.images.map((img) => img.url)} />

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-sm text-muted-foreground">
                {product.category.name}
              </p>
              {!product.discount && (
                <div className="mt-4 flex items-baseline gap-4">
                  <span className="text-3xl font-bold">
                    {product.price.toFixed(2)} DZD
                  </span>
                </div>
              )}
              {product.discount && (
                <div className="mt-4 flex items-baseline gap-4">
                  <span className="text-3xl font-bold">
                    {product.price.toFixed(2)} DZD
                  </span>
                  <span className="text-2xl line-through ">
                    {product.discount.toFixed(2)} DZD
                  </span>
                </div>
              )}
            </div>

            <div className="flex  gap-4">
              <Link href={`/confirm-order?productId=${product.id}`} passHref>
                <Button size="lg" className="flex-1 bg-primary">
                  Payer Maintenant
                </Button>
              </Link>
              <AddProductToCart product={product} />
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Description</h2>
              <p>{product.description}</p>
            </div>
          </div>
        </div>

        <div className="space-y-8 ">
          <div className="py-2" />
          <h2 className="text-xl font-semibold">Spécifications</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {product.features.map((spec, idx) => (
              <div key={idx} className="flex flex-col">
                <dt className="font-medium">{spec.name}</dt>
                <dd className="text-muted-foreground">{spec.value}</dd>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
