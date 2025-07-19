/**
 * Calculates the final price of a product considering any discount
 * @param price The original price of the product
 * @param discount Optional discount value
 * @returns The final price after applying discount (if applicable)
 */
export function getFinalPrice(price: number, discount?: number | null): number {
  if (discount && discount > 0 && discount < price) {
    return discount;
  }
  return price;
}

import { revalidatePath, revalidateTag } from "next/cache";

type RevalidationTarget = {
  productSlug?: string;
  categorySlug?: string;
  isHomepage?: boolean;
};

/**
 * Revalidates all necessary paths and tags when a product is created, updated or deleted
 * to ensure the latest data is displayed throughout the application
 */
export async function revalidateProductCache({
  productSlug,
  categorySlug,
  isHomepage,
}: RevalidationTarget) {
  // Revalidate specific product page
  if (productSlug) {
    revalidatePath(`/product/${productSlug}`);
    revalidateTag(`product-${productSlug}`);
  }

  // Revalidate category pages
  if (categorySlug) {
    revalidatePath(`/constantine/${categorySlug}`);
    revalidateTag(`category-${categorySlug}`);
  }

  // Always revalidate product listings
  revalidatePath("/");
  revalidateTag("products");

  // Revalidate homepage if needed (featured products, carousel)
  if (isHomepage || isHomepage === undefined) {
    revalidatePath("/");
    revalidateTag("homepage");
  }

  // Revalidate admin dashboard
  revalidatePath("/admin/dashboard/products");
  revalidateTag("admin-products");
}
