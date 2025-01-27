import { CartItems } from "./_components/cart-items";
import { CartSummary } from "./_components/cart-summary";
import { SiteHeader } from "../../components/layout/site-header/site-header";
import { SiteNav } from "../../components/layout/site-nav";
import ConfirmCommandButton from "./_components/ConfirmCommandButton";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Votre Panier - WorldTech Constantine",
};

export default function CartPage() {
  return (
    <>
      <Container>
        <SiteHeader />
        <SiteNav />
        <main className="min-h-screen py-12">
          <h1 className="text-3xl font-bold font-heading text-tahat-900 mb-8">
            Votre Panier
          </h1>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItems />
            </div>
            <div className="space-y-4">
              <CartSummary />
              <ConfirmCommandButton />
            </div>
          </div>
        </main>
      </Container>
      <Footer />
    </>
  );
}
