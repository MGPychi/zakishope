import { CartItems } from "./_components/cart-items";
import { CartSummary } from "./_components/cart-summary";
import { SiteHeader } from "../../components/layout/site-header/site-header";
import { SiteNav } from "../../components/layout/site-nav";

export default function CartPage() {
  return (
    <div className="min-h-screen container mx-auto max-w-screen-2xl bg-background">
      <SiteHeader />
      <SiteNav />
      <main className="container py-12">
        <h1 className="text-3xl font-bold font-heading text-tahat-900 mb-8">Votre Panier</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartItems />
          </div>
          <div>
            <CartSummary />
          </div>
        </div>
      </main>
    </div>
  )
}

