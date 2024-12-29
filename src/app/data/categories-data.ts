"use server";
import { PAGE_SIZE } from "@/constants";
import { db } from "@/db";
import { categories, selectCategorySchema  } from "@/db/schema"; // Import relevant schema
import { and, eq, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { z } from "zod";

interface CategoriesResponse {
  data: Array<z.infer<typeof selectCategorySchema>>;
  hasNext: boolean;
  hasPrev: boolean;
  count: number;
  pageCount: number;
}

interface GetCategoriesParams {
  page: number;
  q?: string;
  isActive?: boolean;
}

// Get all featured and active categories with their images
export const getAllFeaturedActiveCategories = unstable_cache(
  async (limit?: number) => {
    return await db.query.categories.findMany({
      limit,
    });
  },
  ["featured_product_categories"],
  {
    tags: ["featured_product_categories"],
  }
);

// Get all active categories
export const getAllActiveCategories = unstable_cache(
  async () => {
    return await db.query.categories.findMany({
    });
  },
  ["active_product_categories"],
  {
    tags: ["active_product_categories"],
  }
);

// Get all categories
export const getAllCategories = unstable_cache(
  async () => {
    return await db.query.categories.findMany({});
  },
  ["categories"],
  {
    tags: ["categories"],
  }
);

// Get category detail with slug
export const getCategoryDetailWithSlug = unstable_cache(
  async (slug: string) => {
    const decodedSlug = decodeURIComponent(slug);
    return await db.query.categories.findFirst({
      where: eq(categories.slug, decodedSlug), // Assuming slug column exists in your schema
    });
  },
  ["product_category_details"],
  { tags: ["product_category_details"] }
);

// Get paginated categories with optional search
export const getCategories = cache(
  async ({ page, q }: GetCategoriesParams): Promise<CategoriesResponse> => {
    const categoriesQuery = db.query.categories.findMany({
      where: and(
        q
          ? sql`${categories.name} LIKE ${`%${q}%`}  `
          : undefined
      ),
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
    });

    const result = await categoriesQuery;
    const totalCount = await getTotalCategoriesCount({ q });
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

// Get count of categories created today
export const getCategoriesCountToday = cache(async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const result = await db.query.categories.findMany({
    where: sql`${categories.createdAt} >= ${today}`,
    columns: {
      id: true,
    },
  });
  return result.length;
});

// Get total count of all categories
export const getTotalCategoriesCount = cache(
  async (params?: { q?: string }) => {
    const { q } = params || {};

    const result = await db
      .select({ count: sql`count(*)` })
      .from(categories)
      .where(
        and(
          q
            ? sql`${categories.name} LIKE ${`%${q}%`} `
            : undefined
        )
      );

    return Number(result[0]?.count ?? 0);
  }
);

// Get count of categories created today
export const getTotalCategoriesCountToday = cache(async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const result = await db.query.categories.findMany({
    where: sql`DATE(${categories.createdAt}) = ${today.toISOString().split("T")[0]}`,
    columns: {
      id: true,
    },
  });
  return result.length;
});
