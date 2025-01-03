import { PAGE_SIZE } from "@/constants";
import { db } from "@/db";
import { products  } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import slugify from "slugify";
// import { z } from "zod";

// interface ProductsResponse {
//   data: Array<z.infer<typeof selectProductSchema> & {
//     images: { url: string; cloudId: string }[];
//   }>;
//   hasNext: boolean;
//   hasPrev: boolean;
//   count: number;
//   pageCount: number;
// }

interface GetProductsParams {
  page: number;
  q?: string;
  category?: string;
}


export const searchAndFilterInAllProducts = cache(
  async ({
    q,
    minPrice,
    maxPrice,
    sortByPrice,
    categories: categoryIds,
  }: {
    q?: string;
    minPrice?: number;
    maxPrice?: number;
    sortByPrice?: "asc" | "desc";
    categories?: string[];
  }) => {
    const conditions = [];

    if (q) {
      conditions.push(sql`${products.name} LIKE ${`%${q}%`} OR ${products.description} LIKE ${`%${q}%`}`);
    }

    if (minPrice) {
      conditions.push(sql`${products.price} >= ${minPrice}`);
    }

    if (maxPrice) {
      conditions.push(sql`${products.price} <= ${maxPrice}`);
    }

    if (categoryIds && categoryIds.length > 0) {
      conditions.push(sql`${products.categoryId} IN (${sql.join(categoryIds)})`);
    }

    const orderBy = sortByPrice
      ? sql`${products.price} ${sortByPrice === "asc" ? "ASC" : "DESC"}`
      : undefined;

    const filteredProducts = await db.query.products.findMany({
      where: and(...conditions),
      orderBy,
      with: {
        images: true,
        category: true,
        features: true,
      },
    });

    return filteredProducts;
  }
);

// Get all featured and active products with their images
export const getAllFeaturedActiveProducts = unstable_cache(
  async (limit?: number) => {
    return await db.query.products.findMany({
      where: eq(products.isFeatured,true ),
      with: {
        images: true,
      },
      limit,
    });
  },
  ["featured_products"],
  {
    tags: ["featured_products"],
  }
);

// Get all active products
export const getAllActiveProducts = unstable_cache(
  async () => {
    return await db.query.products.findMany({
      with: {
        images: true,
      },
    });
  },
  ["active_products"],
  {
    tags: ["active_products"],
  }
);

// Get all products
export const getAllProducts = unstable_cache(
  async () => {
    return await db.query.products.findMany({
      with: {
        images: true,
      },
    });
  },
  ["products"],
  {
    tags: ["products"],
  }
);

// Get product detail with slug
export const getProductDetailWithSlug = unstable_cache(
  async (slug: string) => {
    const decodedSlug = decodeURIComponent(slug);
    return await db.query.products.findFirst({
      where: eq(products.slug, decodedSlug),
      with: {
        images: true,
        features: true,
        category: true,
      },
    });
  },
  ["product_details"],
  { tags: ["product_details"] }
);

// Get paginated products with optional search
export const getProducts = cache(
  async ({ page, q,  category }: GetProductsParams)  => {
    const sluggedCategory = slugify(category ?? "");
    const foundCategory = await db.query.categories.findFirst({
      where: eq(products.slug, sluggedCategory),
    });
    const productsQuery = db.query.products.findMany({
      where: and(
        foundCategory ? eq(products.categoryId, foundCategory.id) : undefined,
        q
          ? sql`${products.name} LIKE ${`%${q}%`} OR ${products.description} LIKE ${`%${q}%`}`
          : undefined,
      ),
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
      with: {
        images: true,
        category: true,
        features: true,
      },
    });

    const result = await productsQuery;
    const totalCount = await getTotalProductsCount();
    const pageCount = Math.ceil(totalCount / PAGE_SIZE);

    return {
      data: result,
      hasNext: page < pageCount,
      hasPrev: page > 1,
      count: totalCount,
      pageCount,
    };
  }
);

// Get total count of all products
export const getTotalProductsCount = cache(async () => {
  return db.$count(products);
});

// Get count of products created today
export const getTotalProductsCountToday = cache(async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = await db.query.products.findMany({
    where: sql`DATE(${products.createdAt}) = ${today.toISOString().split("T")[0]}`,
    columns: {
      id: true,
    },
  });

  return result.length;
});
// Get the latest 4 products
export const getLatestProducts = unstable_cache(
  async () => {
    return await db.query.products.findMany({
      orderBy: (products,{desc})=>[desc(products.createdAt)], 
      limit: 4, // Limit to the latest 4 products
      with: {
        images: true, // Include associated images
      },
    });
  },
  ["latest_products"], // Cache key
  {
    tags: ["latest_products"], // Cache tags
  }
);

