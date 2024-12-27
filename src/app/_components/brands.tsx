import Image from 'next/image'

export function Brands() {
  const brands = [
    "/placeholder.svg?height=60&width=120",
    "/placeholder.svg?height=60&width=120",
    "/placeholder.svg?height=60&width=120",
    "/placeholder.svg?height=60&width=120",
    "/placeholder.svg?height=60&width=120",
    "/placeholder.svg?height=60&width=120",
  ]

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Nos Marques Partenaires</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
        {brands.map((brand, index) => (
          <div key={index} className="flex items-center justify-center">
            <Image
              src={brand}
              alt={`Brand ${index + 1}`}
              width={120}
              height={60}
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

