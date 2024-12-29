"use server";
import { categories } from "@/db/schema";
import { generateCloudinarySignature } from "@/lib/cloudinary";
import { actionClient, protectedActionClient } from "@/lib/safe-actions";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";
import slugify from "slugify";

export async function generateUploadSignature() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = generateCloudinarySignature(
    {
      timestamp: timestamp,
      folder: "product_categories",
    },
    process.env.CLOUDINARY_API_SECRET!
  );

  return {
    timestamp,
    signature,
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  };
}

const updateProductCategorySchema = zfd.formData({
  id: zfd.text(),
  name: zfd.text(),
  description: zfd.text(),
});

export const updateProductCategory = protectedActionClient
  .schema(updateProductCategorySchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      // Start a transaction to ensure data consistency
      const result = await ctx.db.transaction(async (tx) => {
        // Generate new slug if name changes
        const slug = slugify(parsedInput.name);

        // 1. Update product category details
        await tx
          .update(categories)
          .set({
            name: parsedInput.name,
            slug,
          })
          .where(eq(categories.id, parsedInput.id));

        return true;
      });

      if (!result) {
        throw new Error("Failed to update product category");
      }

      // Revalidate the path to reflect the updated data
      revalidatePath("/admin/dashboard/categories");
      revalidatePath("/admin/dashboard/products");
      revalidateTag("featured_product_categories");
      revalidatePath("/");
      return { success: true };
    } catch (err) {
      console.error("Error updating product category:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  });

export const deleteProductCategory = protectedActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    try {
      await ctx.db
        .delete(categories)
        .where(eq(categories.id, parsedInput.id));

      revalidatePath("/admin/dashboard/categories");
      revalidatePath("/admin/dashboard/products");
      revalidateTag("featured_product_categories");
      return { success: true };
    } catch (err) {
      console.error("Error deleting product category:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  });

const createProductCategorySchema = zfd.formData({
  description: zfd.text(),
  name: zfd.text(),
});

export const createProductCategory = actionClient
  .schema(createProductCategorySchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      const slug = slugify(parsedInput.name);

      await ctx.db
        .insert(categories)
        .values({
          slug,
          name: parsedInput.name,
        })
        .returning({ id: categories.id });

      revalidatePath("/admin/dashboard/product-categories");
      revalidatePath("/");
      return { success: true };
    } catch (err) {
      console.error("Error creating product category:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  });
