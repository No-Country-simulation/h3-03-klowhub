import SearchFilter from "@/components/search-filter/search-filter.component";
import ProductCard from "@/components/product-card/product-card.component";
import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import Pager from "@/components/pager/pager.component";

import { IsClientProvider } from "@/contexts/is-client.context";
import { categories } from "@/mocks/categories.mocks";
import { getQueryParams } from "@/utils/route.utils";
import SideModal from "@/components/side-modal/side-modal.component";
import QuickView from "@/components/quick-view/quick-view.component";
import { TQuickView } from "@/components/product-card/product-card.types";
import { sector, platform, language, functionalities, toolsAndPlatforms, coreContent, courseDifficulty, contentType } from "@/consts/filters.consts";

const filters = [
  platform,
  language,
  contentType,
  courseDifficulty,
  coreContent,
  sector,
  functionalities,
  toolsAndPlatforms
];


const getProducts = async (endpoint: string) => {
  try {
    const res = await fetch(endpoint, { cache: "force-cache" });
    const items: { data: TQuickView[] } = await res.json();
    return items
  } catch (err) {
    console.error('there was an error when getting applications: ', err);
  }
};

const Page = async () => {
  const products = await getProducts(`${process.env.NEXT_PUBLIC_COURSES_URL}?withAuthor=true`);
  const queryParams = await getQueryParams();

  return (
    <main>
      <BreadCrumb />

      <IsClientProvider>
        <SearchFilter filters={filters} categories={categories} />
      </IsClientProvider>

      <div>
        {products.map((c, idx) => (
          <ProductCard data={c} key={idx} />
        ))}
      </div>
      {queryParams.modal &&
        <SideModal>
          <QuickView products={products} />
        </SideModal>
      }
      <Pager />
    </main>
  );

};

export default Page;
