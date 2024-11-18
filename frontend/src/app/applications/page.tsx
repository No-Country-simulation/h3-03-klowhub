import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import SearchFilter from "@/components/search-filter/search-filter.component";
import Pager from "@/components/pager/pager.component";

import { sector, plaform, language, functionalities, toolsAndPlatforms } from "@/consts/filters.consts";
import { IsClientProvider } from "@/contexts/is-client.context";
import ProductCard from "@/components/product-card/product-card.component";
import SideModal from "@/components/side-modal/side-modal.component";
import QuickView from "@/components/quick-view/quick-view.component";
import { getQueryParams } from "@/utils/route.utils";
import { TProduct } from "@/components/product-card/product-card.types";

const filters = [
  plaform,
  language,
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


const AppliactionsPage = async () => {
  const products = await getProducts(endpoint);
  const queryParams = await getQueryParams();

  return (
    <main className="w-full">
      <div className="container px-6 md:px-0 mx-auto">
        <BreadCrumb />
      </div>

      <IsClientProvider>
        <SearchFilter filters={filters} />
      </IsClientProvider>
      <div 
        className="
        container px-5 grid grid-cols-1 gap-5 mx-auto
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

        { queryParams.modal && 
          <SideModal>
            <div className={`
                grid grid-cols-1 gap-5 px-3 w-full h-full overflow-scroll
                sm:grid-cols-2
              `}
            >
              <QuickView products={products.data} />
            </div>
          </SideModal>
        }

      <Pager/>
    </main>
  )
};

export default AppliactionsPage
