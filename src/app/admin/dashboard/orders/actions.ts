'use server';

import { orders, orderItems } from "@/db/schema";
import { actionClient, protectedActionClient } from "@/lib/safe-actions";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createOrderSchema = z.object({
  firstName: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères.",
  }),
  lastName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  phone: z.string().regex(/^(0)(5|6|7)[0-9]{8}$/, {
    message: "Veuillez entrer un numéro de téléphone valide.",
  }),
  wilaya: z.string({
    required_error: "Veuillez sélectionner une wilaya.",
  }),
  address: z.string().min(10, {
    message: "L'adresse doit contenir au moins 10 caractères.",
  }),
  totalAmount: z.number().min(0),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
      price: z.number().min(0),
    })
  ),
})

export type CreateOrderInput = z.infer<typeof createOrderSchema>

export const createOrder = actionClient
  .schema(createOrderSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { items, ...orderData } = parsedInput
    
    try {
      const [order] = await ctx.db
        .insert(orders)
        .values({ 
          ...orderData, 
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning({ id: orders.id })

      await ctx.db.insert(orderItems).values(
        items.map((item) => ({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          createdAt: new Date(),
          updatedAt: new Date(),
        }))
      )
      return {
        success: true as const,
        data: { 
          orderId: order.id,
          message: "Commande créée avec succès" 
        }
      }

      revalidatePath("/admin/dashboard/orders")
      
      return {
        success: true as const,
        data: { 
          orderId: order.id,
          message: "Commande créée avec succès" 
        }
      }
    } catch (err) {
      console.error("Error creating order:", err)
      return {
        success: false as const,
        error: "Une erreur est survenue lors de la création de la commande"
      }
    }
  })

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

