import { MetadataRoute } from "next";
import { getAllProducts } from "./data/products-data";
import { getAllCategories } from "./data/categories-data";

const staticLinks: MetadataRoute.Sitemap = [
  {
    url: `${process.env.NEXT_PUBLIC_SITE}`,
    priority: 1,
    lastModified: new Date(),
    changeFrequency: "daily",
  },

  {
    url: `${process.env.NEXT_PUBLIC_SITE}/search`,
    priority: 0.7,
    lastModified: new Date(),
    changeFrequency: "daily",
  },

  {
    url: `${process.env.NEXT_PUBLIC_SITE}/cart`,
    priority: 0.4,
    lastModified: new Date(),
    changeFrequency: "daily",
  },
];

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const productLinks: MetadataRoute.Sitemap = (await getAllProducts()).map(
    (product) => ({
      url: `${process.env.NEXT_PUBLIC_SITE}/product/${product.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: product.updatedAt,
    })
  );
  const categoryLinks: MetadataRoute.Sitemap = (await getAllCategories()).map(
    (category) => ({
      url: `${process.env.NEXT_PUBLIC_SITE}/constantine/${category.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: category.updatedAt,
    })
  );

  return [...staticLinks, ...productLinks, ...categoryLinks];
};

export default sitemap;
