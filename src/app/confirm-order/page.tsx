import { SiteHeader } from "../../components/layout/site-header/site-header";
import { SiteNav } from "../../components/layout/site-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ConfirmOrderPage() {
  return (
    <div className="min-h-screen container mx-auto max-w-screen-2xl bg-background">
      <SiteHeader />
      <SiteNav />
      <main className="container py-12">
        <h1 className="text-3xl font-bold font-heading text-tahat-900 mb-8">Confirmer la commande</h1>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" placeholder="Entrez votre nom complet" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Numéro de téléphone</Label>
              <Input id="phone" placeholder="Entrez votre numéro de téléphone" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Adresse de livraison</Label>
              <Textarea id="address" placeholder="Entrez votre adresse de livraison" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>
              {/* Here you would map through the cart items and display them */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="font-semibold">11,900 DA</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Méthode de paiement</span>
                  <span>Paiement à la livraison</span>
                </div>
              </div>
            </div>
            <Button className="w-full" size="lg">Confirmer la commande</Button>
            <p className="text-sm text-center text-gray-600">
              En confirmant votre commande, vous acceptez nos conditions générales de vente.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

