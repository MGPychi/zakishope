import { selectProductSchema } from "@/db/schema";
import { z } from "zod";

export default interface CartItem {
  qt: number;
  item: z.infer<typeof selectProductSchema> & {
    images: { url: string }[];
  };
}
export interface Product {
  name: string;
  image: string;
  id: string;
  price: number;
}
