"use server";
import { categories } from "@/db/schema";
import { actionClient, protectedActionClient } from "@/lib/safe-actions";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";
import slugify from "slugify";


const updateProductCategorySchema = zfd.formData({
  id: zfd.text(),
  name: zfd.text(),
  isFeatured: zfd.text().transform((val) => val === "true"),
  imageUrl: zfd.text().optional(),
  cloudId: zfd.text().optional(),
});

export const updateProductCategory = protectedActionClient
  .schema(updateProductCategorySchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      // Start a transaction to ensure data consistency
      const result = await ctx.db.transaction(async (tx) => {
        // Generate new slug if name changes
        // const slug = slugify(parsedInput.name);

        // 1. Update product category details
        await tx
          .update(categories)
          .set({
            name: parsedInput.name,
            // slug,
            isFeatured: parsedInput.isFeatured,
            image: parsedInput.imageUrl || "",
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
      revalidateTag("categories");
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
      revalidateTag("categories");
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
  name: zfd.text(),
  isFeatured: zfd.text().transform((val) => val === "true"),
  imageUrl: zfd.text(),
  cloudId: zfd.text().optional(),
});

export const createProductCategory = actionClient
  .schema(createProductCategorySchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      const slug = slugify(parsedInput.name);
      console.log(parsedInput)

      await ctx.db
        .insert(categories)
        .values({
          slug,
          name: parsedInput.name,
          isFeatured: parsedInput.isFeatured,
          image: parsedInput.imageUrl || "",
        })
        .returning({ id: categories.id });

      revalidatePath("/admin/dashboard/product-categories");
      revalidatePath("/");
      revalidateTag("categories");
      return { success: true, data: { success: true } };
    } catch (err) {
      console.error("Error creating product category:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  });