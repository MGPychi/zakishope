"use server";

import { orders, orderItems, insertOrderSchema } from "@/db/schema";
import { actionClient, protectedActionClient } from "@/lib/safe-actions";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createOrderSchema = z.object({
  ...insertOrderSchema.shape,
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number(),
      price: z.number(),
    })
  ),
});

export const createOrder = actionClient
  .schema(createOrderSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { items, ...orderData } = parsedInput;

    try {
      const [order] = await ctx.db
        .insert(orders)
        .values({ ...orderData, status: "pending" })
        .returning({ id: orders.id });

      await ctx.db.insert(orderItems).values(
        items.map((item) => ({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        }))
      );
    } catch (err) {
      console.error(err);
      return { success: false };
    }

    revalidatePath("/admin/dashboard/orders");
    return {
      success: true,
    };
  });

export const deleteOrder = protectedActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    try {
      if (ctx.user.role !== "admin") return { success: false };
      await ctx.db.delete(orders).where(eq(orders.id, parsedInput.id));
    } catch (err) {
      console.error(err);
      return { success: false };
    }
    revalidatePath("/admin/dashboard/orders");
    return { success: true };
  });
