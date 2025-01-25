import { Truck, CreditCard, BadgeCheck, Shield, DollarSign, MapPin } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

const features = [
    {
        icon: Truck,
        title: "Livraison Gratuite",
        description: "Livraison gratuite pour toutes les commandes",
    },
    {
        icon: CreditCard,
        title: "Paiement à la Livraison",
        description: "Payez en espèces à la livraison",
    },
    {
        icon: BadgeCheck,
        title: "Produits de Qualité",
        description: "Tous les produits sont certifiés de haute qualité",
    },
    {
        icon: Shield,
        title: "Paiements Sécurisés",
        description: "Vos paiements sont sécurisés avec un cryptage de pointe",
    },
    {
        icon: DollarSign,
        title: "Meilleurs Prix",
        description: "Nous offrons les meilleurs prix comparés aux autres",
    },
    {
        icon: MapPin,
        title: "Visitez Notre Magasin",
        description: "Venez voir et tester les produits dans notre magasin",
    },
]

export function WhyChooseUs() {
    return (
        <section className="py-12 w-full ">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight">Pourquoi Choisir WorldTech</h2>
                <p className="text-muted-foreground mt-2">Nous offrons la meilleure expérience d&apos;achat pour l&apos;électronique domestique</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <Card key={index} className="border-none shadow-none hover:bg-accent transition-colors">
                        <CardContent className="flex items-start space-x-4 pt-6">
                            <div className="shrink-0 p-2 bg-primary/10 rounded-lg">
                                <feature.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-semibold">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
