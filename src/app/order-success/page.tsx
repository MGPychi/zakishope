import { CheckCircle } from 'lucide-react'
import Link from "next/link"
import { SiteHeader } from "../../components/layout/site-header/site-header"
// import { SiteNav } from "../../components/layout/site-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen container mx-auto max-w-screen-2xl bg-background">
      <SiteHeader />
      <main className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold font-heading text-tahat-900">Commande Confirmée</h1>
            <p className="text-muted-foreground mt-2">
              Merci pour votre commande. Nous vous contacterons bientôt pour la livraison.
            </p>
          </div>

          <Card className="p-6 mb-6">
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h2 className="font-semibold text-lg mb-2">Détails de la commande</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {/* <div>
                    <p className="text-muted-foreground">Numéro de commande</p>
                    <p className="font-medium">#ORD-2024-001</p>
                  </div> */}
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">27 Dec 2024</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total</p>
                    <p className="font-medium">11,900 DA</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Méthode de paiement</p>
                    <p className="font-medium">Paiement à la livraison</p>
                  </div>
                </div>
              </div>

              <div className="border-b pb-4">
                <h2 className="font-semibold text-lg mb-2">Informations de livraison</h2>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">Chihab Djeribiaa</p>
                  <p className="text-muted-foreground">781810656</p>
                  <p className="text-muted-foreground">Constantine</p>
                  <p className="text-muted-foreground">Wilaya: Blida</p>
                </div>
              </div>

              <div>
                <h2 className="font-semibold text-lg mb-2">Prochaines étapes</h2>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Vous recevrez un SMS de confirmation avec les détails de votre commande</li>
                  <li>Notre équipe de livraison vous contactera pour organiser la livraison</li>
                  <li>Préparez le montant exact pour le paiement à la livraison</li>
                </ul>
              </div>
            </div>
          </Card>

          <div className="flex justify-center gap-4">
            <Link href="/">
              <Button variant="outline">
                Continuer vos achats
              </Button>
            </Link>
            <Link href="/account/orders">
              <Button>
                Voir mes commandes
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

