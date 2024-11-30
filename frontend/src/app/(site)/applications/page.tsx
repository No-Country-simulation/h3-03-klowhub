import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import SearchFilter from "@/components/search-filter/search-filter.component";
import Pager from "@/components/pager/pager.component";

import { sector, plaform, language, functionalities, toolsAndPlatforms } from "@/consts/filters.consts";
import { IsClientProvider } from "@/contexts/is-client.context";
import ProductCard from "@/components/product-card/product-card.component";
import SideModal from "@/components/side-modal/side-modal.component";
import QuickView from "@/components/quick-view/quick-view.component";
import { getQueryParams } from "@/utils/route.utils";
import { QuickView as TQuickView } from "@/components/product-card/product-card.types";

const filters = [
  plaform,
  language,
  sector,
  functionalities,
  toolsAndPlatforms
];

const endpoint = "http://localhost:3000/api/applications?withAuthor=true";

const getProducts = async (endpoint: string) => {
  const res = await fetch(endpoint, { cache: "force-cache" });
  const items: { data: TQuickView[] } = await res.json();
  return items
};


const AppliactionsPage = async () => {
  const products = await getProducts(endpoint);
  const queryParams = await getQueryParams();

  return (
    <main>
      <BreadCrumb />

      <IsClientProvider>
        <SearchFilter filters={filters} />
      </IsClientProvider>
      <div
        className="
        grid grid-cols-1 gap-5
        md:grid-cols-2 md:px-0
        lg:grid-cols-3
        xl:grid-cols-4
        "
      >
        {products.data.map((c, idx) => (
          <ProductCard
            key={`product-card-${idx}`}
            data={c.product}
          />
        ))}
      </div>

      {queryParams.modal &&
        <SideModal>
          <QuickView products={products.data} />
        </SideModal>
      }

      <Pager />
    </main>
  )
};

export default AppliactionsPage
