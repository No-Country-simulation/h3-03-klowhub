import SearchFilter from "@/components/search-filter/search-filter.component";
import ProductCard from "@/components/product-card/product-card.component";
import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import Pager from "@/components/pager/pager.component";

import { IsClientProvider } from "@/contexts/is-client.context";
import { categories } from "@/mocks/categories.mocks";
import { getQueryParams } from "@/utils/route.utils";
import { TProduct } from "@/components/product-card/product-card.types";
import SideModal from "@/components/side-modal/side-modal.component";
import QuickView from "@/components/quick-view/quick-view.component";

import { sector, plaform, language, functionalities, toolsAndPlatforms, contentCore, level, contentType } from "@/consts/filters.consts";

const filters = [
  plaform,
  language,
  contentType,
  level,
  contentCore,
  sector,
  functionalities,
  toolsAndPlatforms
];

const endpoint = "http://localhost:3000/api/products";

const getProducts = async (endpoint: string) => {
  const res = await fetch(endpoint, { cache: "force-cache" });
  const items: { data: TProduct[] } = await res.json();
  return items
};

const Page = async () => {
  const products = await getProducts(endpoint);
  const queryParams = await getQueryParams();

  return (
    <div>
      <div className="container px-6 md:px-0 mx-auto">
        <BreadCrumb />
      </div>

      <IsClientProvider>
        <SearchFilter filters={filters} categories={categories} />
      </IsClientProvider>

      <div className="container mx-auto px-6 md:px-0">
        {products.data.map((c, idx) => (
          <ProductCard data={c.product} key={idx} />
        ))}
      </div>
        { queryParams.modal && 
          <SideModal>
            <QuickView products={products.data} />
          </SideModal>
        }
      <Pager />
    </div>
  );

};

export default Page;
