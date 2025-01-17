'use client'
import { useState  } from 'react'
import { SiteHeader } from "../../components/layout/site-header/site-header"
import { SiteNav } from "../../components/layout/site-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from 'next/navigation'
import { createOrder } from '../admin/dashboard/orders/actions'
import { useCart } from '@/hooks/useCart'

const algerianWilayas = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar",
  "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger",
  "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma",
  "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh",
  "Illizi", "Bordj Bou Arréridj", "Boumerdès", "El Tarf", "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent",
  "Ghardaïa", "Relizane", "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal", "Béni Abbès",
  "In Salah", "In Guezzam", "Touggourt", "Djanet", "El M'Ghair", "El Meniaa"
]

export default function ConfirmOrderPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    wilaya: '',
    address: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { items, getTotal, clearCart } = useCart()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await createOrder({
        ...formData,
        totalAmount: getTotal(),
        items: items.map(item => ({
          productId: item.item.id,
          quantity: item.qt,
          price: item.item.price
        }))
      })

      if (result?.data?.success) {
        clearCart()
        router.push('/order-success')
      } else {
        // Handle error
        console.error('Failed to create order')
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Error creating order:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen container mx-auto max-w-screen-2xl bg-background">
      <SiteHeader />
      <SiteNav />
      <main className="container py-12 px-4">
        <h1 className="text-3xl font-bold font-heading text-tahat-900 mb-8">Confirmer la commande</h1>
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input 
                id="lastName" 
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Entrez votre nom" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input 
                id="firstName" 
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Entrez votre prénom" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Numéro de téléphone</Label>
              <Input 
                id="phone" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Entrez votre numéro de téléphone" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wilaya">Wilaya</Label>
              <select
                id="wilaya"
                name="wilaya"
                value={formData.wilaya}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                required
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
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Entrez votre adresse de livraison"
                required
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="font-semibold">{getTotal()} DA</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Méthode de paiement</span>
                  <span>Paiement à la livraison</span>
                </div>
              </div>
            </div>
            <Button className="w-full" size="lg" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Traitement en cours...' : 'Confirmer la commande'}
            </Button>
            <p className="text-sm text-center text-gray-600">
              En confirmant votre commande, vous acceptez nos conditions générales de vente.
            </p>
          </div>
        </form>
      </main>
    </div>
  )
}

