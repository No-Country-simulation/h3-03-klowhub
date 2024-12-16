import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import SearchFilter from "@/components/search-filter/search-filter.component";
import Pager from "@/components/pager/pager.component";

import { sector, platform, language, functionalities, toolsAndPlatforms } from "@/consts/filters.consts";
import { IsClientProvider } from "@/contexts/is-client/is-client.context";
import ProductCard from "@/components/product-card/product-card.component";
import SideModal from "@/components/side-modal/side-modal.component";
import QuickView from "@/components/quick-view/quick-view.component";
import { getQueryParams } from "@/utils/route.utils";
import { TQuickView } from "@/components/product-card/product-card.types";
import { transformApp, transformAuthor } from "./applications-page.acl";
import { ApplicationWithFullImgs } from "@/types/application.types";

const filters = [
  platform,
  language,
  sector,
  functionalities,
  toolsAndPlatforms
];

// const endpoint = `${process.env.NEXT_PUBLIC_APPLICATIONS_URL}?withAuthor=true`;
const endpoint = `${process.env.NEXT_PUBLIC_APPLICATIONS_URL}?withAuthor=true`;

const getProducts = async (endpoint: string) => {
  try {
    const res = await fetch(endpoint);
    const apps: ApplicationWithFullImgs[] = await res.json();
    const transformedApps: TQuickView[] = apps.map(app => transformApp(app));
    return transformedApps
  } catch (err) {
    console.log("there was an error when requesting apps: ", err);
  }
};


const AppliactionsPage = async () => {
  const applications = await getProducts(endpoint) || [];
  console.log('applications: ', applications);
  const queryParams = await getQueryParams();

  return (
    <main className="pb-6">
      <BreadCrumb />

      <IsClientProvider>
        <SearchFilter filters={filters} />
      </IsClientProvider>
      <div 
        className="
        mb-6
        grid grid-cols-1 gap-5
        md:grid-cols-2 md:px-0
        lg:grid-cols-3
        xl:grid-cols-4
        "
      >
        {applications.map((app, idx) => (
          <ProductCard
            key={`product-card-${idx}`}
            data={app}
          />
        ))}
      </div>

        { queryParams.modal && 
          <SideModal>
            <QuickView products={applications} />
          </SideModal>
        }

      <Pager/>
    </main>
  )
};

export default AppliactionsPage
