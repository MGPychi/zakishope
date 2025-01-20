import { SiteHeader } from "@/components/layout/site-header/site-header"
import { SiteNav } from "@/components/layout/site-nav"
import { ConfirmOrderForm } from "./confirm-order-form"

export default function ConfirmOrderPage() {
  return (
    <div className="min-h-screen container mx-auto max-w-screen-2xl bg-background">
      <SiteHeader />
      <SiteNav />
      <main className="container py-12 px-4">
        <h1 className="text-3xl font-bold font-heading mb-8">
          Confirmer la commande
        </h1>
        <ConfirmOrderForm />
      </main>
    </div>
  )
}
