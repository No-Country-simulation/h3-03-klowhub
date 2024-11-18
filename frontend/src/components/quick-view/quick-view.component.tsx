import { TProduct } from "../product-card/product-card.types";
import { getQueryParams } from "@/utils/route.utils";

type QuickViewProps = {
  products: TProduct[]
}


const QuickView = async ({ products }: QuickViewProps) => {
  const queryParams = await getQueryParams();
  const currentProduct = products.find(p => p.product.id === Number(queryParams.product))
  console.log('currentProduct: ', currentProduct);

  return (
    <div className="bg-black">
      <h1>Texto temporal</h1>
    </div>
  )
};

export default QuickView
