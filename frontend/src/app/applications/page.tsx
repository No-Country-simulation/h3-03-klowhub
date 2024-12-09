import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import SearchFilter from "@/components/search-filter/search-filter.component";
import Pager from "@/components/pager/pager.component";

import { sector, platform, language, functionalities, toolsAndPlatforms } from "@/consts/filters.consts";
import { IsClientProvider } from "@/contexts/is-client.context";
import ProductCard from "@/components/product-card/product-card.component";
import SideModal from "@/components/side-modal/side-modal.component";
import QuickView from "@/components/quick-view/quick-view.component";
import { getQueryParams } from "@/utils/route.utils";
import { TQuickView } from "@/components/product-card/product-card.types";

const filters = [
  platform,
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
  const applications = await getProducts(endpoint);
  console.log('applications: ', applications);
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
        {applications.data.map((app, idx) => (
          <ProductCard
            key={`product-card-${idx}`}
            data={app}
          />
        ))}
      </div>

        { queryParams.modal && 
          <SideModal>
            <QuickView products={applications.data} />
          </SideModal>
        }

      <Pager/>
    </main>
  )
};

export default AppliactionsPage
