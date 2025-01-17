"use server";
import { PAGE_SIZE } from "@/constants";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { and, count, gte, or, sql } from "drizzle-orm";
import { cache } from "react";
export const getOrders = cache(
  async ({ page, q }: { page: number; q?: string }) => {
    const filteredOrders = db.$with("filtered_orders").as(
      db
        .select()
        .from(orders)
        .where(
          and(
            q
              ? or(
                  sql`${orders.address} LIKE ${`%${q}%`}`,
                  sql`${orders.firstName} LIKE ${`%${q}%`}`,
                  sql`${orders.lastName} LIKE ${`%${q}%`}`,
                  sql`${orders.phone} LIKE ${`%${q}%`}`,
                  sql`${orders.wilaya} LIKE ${`%${q}%`}`
                )
              : undefined
          )
        )
    );

    const result = await db
      .with(filteredOrders)
      .select()
      .from(filteredOrders)
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE);

    // Get total order count after filters
    const c = await getOrdersCount({ q });
    const pageCount = Math.ceil(c / PAGE_SIZE);
    const hasNext = page < pageCount;
    const hasPrev = page > 1;

    return { data: result, hasNext, hasPrev, count: c, pageCount };
  }
);
export const getOrdersCount = cache(async ({ q }: { q?: string }) => {
  const filteredOrders = db.$with("filtered_orders").as(
    db
      .select()
      .from(orders)
      .where(
        and(
          q
            ? or(
                  sql`${orders.address} LIKE ${`%${q}%`}`,
                  sql`${orders.firstName} LIKE ${`%${q}%`}`,
                  sql`${orders.lastName} LIKE ${`%${q}%`}`,
                  sql`${orders.phone} LIKE ${`%${q}%`}`,
                  sql`${orders.wilaya} LIKE ${`%${q}%`}`
              )
            : undefined
        )
      )
  );

  const [result] = await db
    .with(filteredOrders)
    .select({ count: count() })
    .from(filteredOrders);

  return result.count;
});

export const getOrderCountToday = cache(async () => {
  const [result] = await db
    .select({ count: count() })
    .from(orders)
    .where(gte(orders.createdAt, new Date()));
  return result.count;
});

export const getTotalOrdersCount = cache(async () => {
  const result = await db.select({ count: count() }).from(orders);
  const c = result[0];
  return c.count;
});
export const getTotalOrdersCountToDay = cache(async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); //
  const result = await db
    .select({ count: count() })
    .from(orders)
    .where(sql`DATE(created_at) = ${today.toISOString().split("T")[0]}`);
  const c = result[0];
  return c.count;
});
