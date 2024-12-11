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

import { getPathname } from "@/utils/route.utils";

import { sector, platform, language, functionalities, toolsAndPlatforms, coreContent, courseDifficulty, contentType } from "@/consts/filters.consts";
import coursesMock from '@/mocks/courses.mock.json';

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

const endpoint = "http://localhost:3000/api/courses?withAuthor=true";

const getProducts = async (endpoint: string) => {
  const res = await fetch(endpoint, { cache: "force-cache" });
  const items: { data: TQuickView[] } = await res.json();
  return items
};

const Page = async () => {
  const products = await getProducts(endpoint);
  const queryParams = await getQueryParams();
  const pathname = await getPathname();

  const courses = { data: coursesMock };

  console.log('courses xdd', courses)

  return (
    <main>
      <BreadCrumb />

      <IsClientProvider>
        <SearchFilter filters={filters} categories={categories} />
      </IsClientProvider>

      <div>
        {products.data.map((c, idx) => (
          <ProductCard data={c} key={idx} />
        ))}
      </div>
      {queryParams.modal &&
        <SideModal>
          <QuickView products={products.data} />
        </SideModal>
      }
      <Pager />
    </main>
  );

};

export default Page;
