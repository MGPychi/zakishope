import { SiteHeader } from "../../components/layout/site-header/site-header";
import { SiteNav } from "../../components/layout/site-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const algerianWilayas = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar",
  "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger",
  "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma",
  "Constantine", "Médéa", "Mostaganem", "M’Sila", "Mascara", "Ouargla", "Oran", "El Bayadh",
  "Illizi", "Bordj Bou Arréridj", "Boumerdès", "El Tarf", "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent",
  "Ghardaïa", "Relizane", "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal", "Béni Abbès",
  "In Salah", "In Guezzam", "Touggourt", "Djanet", "El M’Ghair", "El Meniaa"
];

export default function ConfirmOrderPage() {
  return (
    <div className="min-h-screen  container mx-auto max-w-screen-2xl bg-background">
      <SiteHeader />
      <SiteNav />
      <main className="container py-12 px-4">
        <h1 className="text-3xl font-bold font-heading text-tahat-900 mb-8">Confirmer la commande</h1>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="lastname">Nom</Label>
              <Input id="lastname" placeholder="Entrez votre nom" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstname">Prénom</Label>
              <Input id="firstname" placeholder="Entrez votre prénom" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Numéro de téléphone</Label>
              <Input id="phone" placeholder="Entrez votre numéro de téléphone" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wilaya">Wilaya</Label>
              <select
                id="wilaya"
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              >
                <option value="">Sélectionnez votre wilaya</option>
                {algerianWilayas.map((wilaya, index) => (
                  <option key={index} value={wilaya}>
                    {wilaya}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Adresse de livraison</Label>
              <Textarea
                className="resize-none"
                id="address"
                placeholder="Entrez votre adresse de livraison"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>
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
            <Link href="/order-success" >
            <Button className="w-full" size="lg">
              Confirmer la commande
            </Button>
            </Link>
            <p className="text-sm text-center text-gray-600">
              En confirmant votre commande, vous acceptez nos conditions générales de vente.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
