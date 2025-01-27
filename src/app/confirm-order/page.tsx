import { SiteHeader } from "@/components/layout/site-header/site-header";
import { SiteNav } from "@/components/layout/site-nav";
import { ConfirmOrderForm } from "./confirm-order-form";
import { getProductDetailWithId } from "@/app/data/products-data";
import Footer from "@/components/layout/Footer";

import Container from "@/components/layout/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirmez Votre Commande - WorldTech Constantine",
};

export default async function ConfirmOrderPage({
  searchParams,
}: {
  searchParams: { productId?: string };
}) {
  const productId = searchParams.productId;
  let product = null;

  if (productId) {
    product = await getProductDetailWithId(productId);
  }

  return (
    <>
      <SiteHeader />
      <Container>
      <SiteNav />
        <main className="container py-12 px-4">
          <h1 className="text-3xl font-bold font-heading mb-8">
            Confirmer la commande
          </h1>
          <ConfirmOrderForm initialProduct={product} />
        </main>
        <Footer />
      </Container>
    </>
  );
}
