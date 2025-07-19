import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getLatestProducts } from "../data/products-data";
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-m";
import { getFinalPrice } from "@/utils/product-utils";

export async function NewArrivals() {
  const latestProducts = await getLatestProducts();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 120,
      },
    },
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.3,
        type: "tween",
      },
    },
  };

  return (
    <section id="new-products" className="py-8 w-full px-4">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-6"
      >
        <h2 className="text-2xl font-bold">Nouveaux Arrivages</h2>
        <Link
          href="/search"
          className="text-primary hidden sm:block hover:underline"
        >
          Voir tout
        </Link>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 px-4 space-y-4 md:grid-cols-4 sm:gap-4"
      >
        {latestProducts.map((product) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            whileHover="hover"
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: 0.2,
              },
            }}
            initial={{ opacity: 0, y: 50 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="group overflow-hidden h-full">
              <Link
                href={`/product/${product.slug}`}
                className="h-full flex flex-col"
              >
                <CardContent className="p-4 flex flex-col flex-grow">
                  <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-lg">
                    <Badge className="absolute top-2 right-2 z-10">
                      Nouveau
                    </Badge>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={product.images[0]?.url ?? ""}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain transition-transform duration-300 ease-in-out"
                      />
                    </motion.div>
                  </div>
                  <div className="min-h-[60px] flex-grow">
                    <h3 className="font-medium">
                      {product.name.length > 50
                        ? `${product.name.substring(0, 50)}...`
                        : product.name}
                    </h3>
                  </div>
                  {(() => {
                    const finalPrice = getFinalPrice(
                      product.price,
                      product.discount
                    );
                    const hasDiscount =
                      product.discount &&
                      product.discount > 0 &&
                      product.discount < product.price;

                    return hasDiscount ? (
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-bold">
                          {finalPrice}DA
                        </span>
                        <span className="text-gray-500 text-sm line-through">
                          {product.price}DA
                        </span>
                      </div>
                    ) : (
                      <p className="text-primary">{product.price}DA</p>
                    );
                  })()}
                </CardContent>
              </Link>
            </Card>
          </motion.div>
        ))}
        <Link
          href="/search"
          className="text-white active:!ring-2 hover:ring-primary sm:hidden hover:underline"
        >
          <Button className="w-full">Voir tout</Button>
        </Link>
      </motion.div>
    </section>
  );
}
