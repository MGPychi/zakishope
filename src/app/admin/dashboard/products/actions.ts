"use server";
import { categories, productImages, products } from "@/db/schema";
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
      folder: "products", // Optional: specify upload folder
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

const updateProductSchema = zfd.formData({
  id: zfd.text(),
  name: zfd.text(),
  description: zfd.text(),
  isFeatured: zfd.text().transform((val) => val === "true"),
  imageUrls: zfd.text().transform((val) => JSON.parse(val)),
  cloudIds: zfd.text().transform((val) => JSON.parse(val)),
  category: zfd.text().optional(),
});

export const updateProduct = protectedActionClient
  .schema(updateProductSchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      // Start a transaction to ensure data consistency
      const sluggedCategory = slugify(parsedInput.category || "");
      const category = await ctx.db.query.categories.findFirst({
        where: eq(categories.slug, sluggedCategory),
      });
      const result = await ctx.db.transaction(async (tx) => {
        // 1. Update product details
        await tx
          .update(products)
          .set({
            name: parsedInput.name,
            description: parsedInput.description,
            isFeatured: parsedInput.isFeatured,
            categoryId: category ? category?.id : undefined,
          })
          .where(eq(products.id, parsedInput.id));

        // 2. Delete all existing product images from the database
        await tx
          .delete(productImages)
          .where(eq(productImages.productId, parsedInput.id));

        // 3. Insert new image records
        if (parsedInput.imageUrls.length > 0) {
          const imageRecords = parsedInput.imageUrls.map(
            (url: string, index: number) => ({
              productId: parsedInput.id,
              url: url,
              cloudId: parsedInput.cloudIds[index],
            })
          );

          await tx.insert(productImages).values(imageRecords);
        }

        return true;
      });

      if (!result) {
        throw new Error("Failed to update product");
      }

      // Revalidate the path to reflect the updated data
      revalidatePath("/admin/dashboard/products");
      revalidateTag("featured_products");
      revalidatePath("/");
      return { success: true };
    } catch (err) {
      console.error("Error updating product:", err);
      return { success: false };
    }
  });

const createProductSchema = zfd.formData({
  description: zfd.text(),
  name: zfd.text(),
  isFeatured: zfd.text(),
  imageUrls: zfd.text().optional(), // For storing Cloudinary URLs
  cloudIds: zfd.text().optional(), // For storing Cloudinary IDs
  category: zfd.text().optional(),
  price: zfd.text(),
});
export const createProduct = actionClient
  .schema(createProductSchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      const slug = slugify(parsedInput.name);
      const sluggedCategory = slugify(parsedInput.category || "");
      const foundCategory = await ctx.db.query.categories.findFirst({

        where: eq(products.slug, sluggedCategory),
      });
      if (!foundCategory) {
        return { success: false };
      }
      const [newProduct] = await ctx.db
        .insert(products)
        .values({
          description: parsedInput.description,
          slug,
          name: parsedInput.name,
          isFeatured: parsedInput.isFeatured === "true",
          categoryId: foundCategory.id,
          price: parseInt(parsedInput.price),

        })
        .returning({ id: products.id });

      // Now we just save the Cloudinary URLs and IDs that were uploaded client-side
      const imageUrls = JSON.parse(parsedInput.imageUrls || "[]");
      const cloudIds = JSON.parse(parsedInput.cloudIds || "[]");
      await Promise.all(
        imageUrls.map((url: string, index: number) =>
          ctx.db.insert(productImages).values({
            productId: newProduct.id,
            cloudId: cloudIds[index],
            url: url,
          })
        )
      );
      revalidatePath("/admin/dashboard/products");
      revalidateTag("featured_products");
      revalidatePath("/");
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  });

export const deleteProduct = protectedActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    try {
      await ctx.db.delete(products).where(eq(products.id, parsedInput.id));
    } catch (err) {
      console.error(err);
      return { success: false };
    }
    revalidatePath("/admin/dashboard/products");
    return { success: true };
  });
