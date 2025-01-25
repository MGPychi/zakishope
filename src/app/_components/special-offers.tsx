import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function SpecialOffers() {
  return (
    <section className="py-8 px-4">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=300&width=600"
            alt="Special offer 1"
            width={600}
            height={300}
            className="object-cover w-full h-[200px]"
          />
          <div className="absolute inset-0 bg-black/60 p-6 flex flex-col justify-center text-white">
            <h3 className="text-2xl font-bold mb-2">Offre Spéciale Smart Watch</h3>
            <p className="mb-4">Jusqu à 30% de réduction</p>
            <Button variant="secondary" className="w-fit">Découvrir</Button>
          </div>
        </div>
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=300&width=600"
            alt="Special offer 2"
            width={600}
            height={300}
            className="object-cover w-full h-[200px]"
          />
          <div className="absolute inset-0 bg-black/60 p-6 flex flex-col justify-center text-white">
            <h3 className="text-2xl font-bold mb-2">Box TV Android</h3>
            <p className="mb-4">À partir de 9,900 DA</p>
            <Button variant="secondary" className="w-fit">Acheter</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

