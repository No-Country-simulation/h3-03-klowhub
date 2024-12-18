import { TProductCard } from "@/components/product-card/product-card.types";

export const getProduct = <T extends TProductCard>(products: T[], currentProductId: string) => {
  console.log('products: ', products);
  const currentProduct = products.find(p => p.id === currentProductId)
  return currentProduct
};
