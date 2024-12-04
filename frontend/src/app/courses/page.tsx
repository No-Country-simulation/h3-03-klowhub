import SearchFilter from "@/components/search-filter/search-filter.component";
import ProductCard from "@/components/product-card/product-card.component";
import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import Pager from "@/components/pager/pager.component";

import { IsClientProvider } from "@/contexts/is-client.context";
import { categories } from "@/mocks/categories.mocks";
import { getQueryParams } from "@/utils/route.utils";
import SideModal from "@/components/side-modal/side-modal.component";
import QuickView from "@/components/quick-view/quick-view.component";
import { QuickView as TQuickVIew } from "@/components/product-card/product-card.types";

import { sector, platform, language, functionalities, toolsAndPlatforms, coreContent, level, contentType } from "@/consts/filters.consts";

const filters = [
  platform,
  language,
  contentType,
  level,
  coreContent,
  sector,
  functionalities,
  toolsAndPlatforms
];

const endpoint = "http://localhost:3000/api/courses?withAuthor=true";

const getProducts = async (endpoint: string) => {
  const res = await fetch(endpoint, { cache: "force-cache" });
  const items: { data: TQuickVIew[] } = await res.json();
  return items
};

const Page = async () => {
  const products = await getProducts(endpoint);
  const queryParams = await getQueryParams();

  return (
    <main>
      <BreadCrumb />

      <IsClientProvider>
        <SearchFilter filters={filters} categories={categories} />
      </IsClientProvider>

      <div>
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
    </main>
  );

};

export default Page;
