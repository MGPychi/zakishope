import Link from "next/link";
import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SITE_DEFAULTS } from "@/constants";
import { getAllFeaturedActiveCategories } from "@/app/data/categories-data";

export default async function Footer() {
  const featuredCategories = await getAllFeaturedActiveCategories();
  return (
    <footer className="w-full mx-auto py-10 bg-background">
      <div className="container px-4 mx-auto max-w-screen-2xl py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Informations sur l'entreprise */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{SITE_DEFAULTS.siteName}</h2>
            <p className="text-sm text-muted-foreground">
              {SITE_DEFAULTS.siteShortDescription}
            </p>
            <div className="space-y-2">
              <p className="text-sm">{SITE_DEFAULTS.phoneNumber}</p>
              <Link
                href={`mailto:${SITE_DEFAULTS.email}`}
                className="text-sm hover:underline"
              >
                {SITE_DEFAULTS.email}
              </Link>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h3 className="font-semibold">Liens rapides</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="#featured-products"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Produits en vedette
              </Link>
              <Link
                href="#featured-categories"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Meilleures marques
              </Link>
              <Link
                href="#new-products"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Nouveaux produits
              </Link>
            </nav>
          </div>

          {/* Service client */}
          <div className="space-y-4">
            <h3 className="font-semibold">Service client</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                À propos de nous
              </Link>
              <Link
                href="/faq"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                FAQs
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Termes et conditions
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Contactez-nous
              </Link>
            </nav>
          </div>

          {/* Catégories */}
          <div className="space-y-4">
            <h3 className="font-semibold">Catégories</h3>
            <nav className="flex flex-col space-y-2">
              {featuredCategories.slice(0, 4).map((c) => (
                <Link
                  key={c.id}
                  href={`/search?category=${c.slug}`}
                  className="text-sm capitalize text-muted-foreground hover:text-foreground"
                >
                  {c.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social & Apps */}
          <div className="space-y-4">
            <h3 className="font-semibold">Connectez-vous avec nous</h3>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://facebook.com">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://instagram.com">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://youtube.com">
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://wa.me/1234567890">
                  <MessageCircle className="h-5 w-5" />
                  <span className="sr-only">WhatsApp</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />
      </div>
    </footer>
  );
}
