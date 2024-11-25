import { TProduct } from "@/components/product-card/product-card.types";

export const getProduct = (products: TProduct[], currentProductId: number) => {
  const currentProduct = products.find(p => p.product.id === currentProductId)
  return currentProduct
};
