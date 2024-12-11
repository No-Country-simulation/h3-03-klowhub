import { TProductCard } from "@/components/product-card/product-card.types";

export const getProduct = <T extends TProductCard>(products: T[], currentProductId: string) => {
  const currentProduct = products.find(p => p.id === currentProductId)
  return currentProduct
};
