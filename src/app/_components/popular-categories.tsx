import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { getAllFeaturedCategories } from "../data/categories-data";
import { SiteNav } from "@/components/layout/site-nav";
import { Button } from "@/components/ui/button";
import * as motion from 'motion/react-m';

export async function PopularCategories() {
  const categories = await getAllFeaturedCategories();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section security="featured-categories" className="container mx-auto py-12 px-4">
      <div className="mb-8 flex items-center justify-between">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold text-gray-900 dark:text-white"
        >
          Catégories Populaires
        </motion.h2>
        <SiteNav>
          <Button variant={"ghost"}>
            <span>Voir tout</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </SiteNav>
      </div>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
      >
        {categories.map((category) => (
          <motion.div 
            key={category.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
          >
            <Link
              href={`/search?category=${category.slug}`}
              className="group"
            >
              <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
                <CardContent className="p-4 flex flex-col items-center text-center relative">
                  <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={
                        category?.image && category.image != "undefined"
                          ? category.image
                          : "/placeholder-category.png"
                      }
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {category.products_count} produits
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}