"use server";
import {
  categories,
  productFeatures,
  productImages,
  products,
} from "@/db/schema";
import { actionClient, protectedActionClient } from "@/lib/safe-actions";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import slugify from "slugify";


const updateProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(50).max(2000),
  isFeatured: z.boolean(),
  imageUrls: z.array(z.string()),
  cloudIds: z.array(z.string()),
  category: z.string().optional(),
  features: z.array(z.object({
    name: z.string().min(1),
    value: z.string().min(1)
  }))
});

export const updateProduct = protectedActionClient
  .schema(updateProductSchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      const sluggedCategory = slugify(parsedInput.category || "");
      const category = await ctx.db.query.categories.findFirst({
        where: eq(categories.slug, sluggedCategory),
      });

      const result = await ctx.db.transaction(async (tx) => {
        await tx
          .update(products)
          .set({
            name: parsedInput.name,
            description: parsedInput.description,
            isFeatured: parsedInput.isFeatured,
            categoryId: category?.id,
          })
          .where(eq(products.id, parsedInput.id));

        await tx
          .delete(productImages)
          .where(eq(productImages.productId, parsedInput.id));

        if (parsedInput.imageUrls.length > 0) {
          const imageRecords = parsedInput.imageUrls.map((url, index) => ({
            productId: parsedInput.id,
            url: url,
            cloudId: parsedInput.cloudIds[index],
          }));

          await tx.insert(productImages).values(imageRecords);
        }

        await tx
          .delete(productFeatures)
          .where(eq(productFeatures.productId, parsedInput.id));

        if (parsedInput.features.length > 0) {
          await tx.insert(productFeatures).values(
            parsedInput.features.map(spec => ({
              productId: parsedInput.id,
              name: spec.name,
              value: spec.value,
            }))
          );
        }

        return true;
      });

      revalidatePath("/admin/dashboard/products");
      revalidateTag("featured_products");
      revalidatePath("/");
      
      return { success: true, data: result };
    } catch (err) {
      console.error("Error updating product:", err);
      return { success: false };
    }
  });

// In your form component file:
// In your server actions file:
const createProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  price: z.number().min(1, "Price must be at least 1."),
  isFeatured: z.boolean().default(false),
  category: z.string({ required_error: "Please select a category." }),
  imageUrls: z.string().transform((val) => JSON.parse(val)),
  cloudIds: z.string().transform((val) => JSON.parse(val)),
  features: z.array(
    z.object({
      name: z.string().min(1, "Specification name is required"),
      value: z.string().min(1, "Specification value is required"),
    })
  ),
});

export const createProduct = actionClient
  .schema(createProductSchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      const slug = slugify(parsedInput.name);
      const sluggedCategory = slugify(parsedInput.category);

      const foundCategory = await ctx.db.query.categories.findFirst({
        where: eq(categories.slug, sluggedCategory),
      });

      if (!foundCategory) return { success: false };

      const [newProduct] = await ctx.db
        .insert(products)
        .values({
          description: parsedInput.description,
          slug,
          name: parsedInput.name,
          isFeatured: parsedInput.isFeatured,
          categoryId: foundCategory.id,
          price: parsedInput.price,
        })
        .returning({ id: products.id });

      // Handle image uploads
      await Promise.all(
        parsedInput.imageUrls.map((url: string, index: number) =>
          ctx.db.insert(productImages).values({
            productId: newProduct.id,
            cloudId: parsedInput.cloudIds[index],
            url: url,
          })
        )
      );

      // Handle features
      await Promise.all(
        parsedInput.features.map((spec) =>
          ctx.db.insert(productFeatures).values({
            productId: newProduct.id,
            name: spec.name,
            value: spec.value,
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
