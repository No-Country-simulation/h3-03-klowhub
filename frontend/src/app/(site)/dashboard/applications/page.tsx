import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component"
import { buttonVariants } from "@/components/ui/button";
// import { Button } from "@/components/ui/button";
import { transactionsData } from "@/mocks/transactions.mocks";
import { getQueryParams } from "@/utils/route.utils";
import { Inter } from "next/font/google";
import { filterData, sortData } from "@/utils/filterdata.utils";
import Link from "next/link";
// import { products } from "@/mocks/products.mocks";
import MyAppsDesktopView from "./views/desktop.view";
import MyAppsMobileView from "./views/mobile.view";
import { TQuickView } from "@/components/product-card/product-card.types";
import NoData from "@/components/no-data/no-data.component";

const endpoint = `${process.env.NEXT_PUBLIC_APPLICATIONS_URL}?withAuthor=true`;

const getProducts = async (endpoint: string) => {
  try {
    const res = await fetch(endpoint, { cache: "force-cache" });
    const items: { data: TQuickView[] } = await res.json();
    // @ts-ignore: Unreachable code error
    if (items.statusCode) return []
    return items
  } catch (err) {
    console.error("error when getting applications: ", err)
  }
};

const MyAppsPage = async () => {
  const applicationsData = await getProducts(endpoint);
  console.log('applicationsData: ', applicationsData);

    const { sortBy, order, filterBy, from, to, items } = await getQueryParams();
    const filteredData = filterData(filterBy, { from: from, to: to, items: items }, transactionsData)
    const sortedData = sortData(sortBy, order, filteredData)

    return (
        <main className={`w-full tracking-wide pb-28`}>
            <div className="px-6 md:px-0 mx-auto">
                <BreadCrumb />
            </div>
            <div className="flex flex-col gap-5">
                <div className="mt-14 flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-center">
                    <h3 className="text-base font-bold">Mis aplicaciones</h3>
                    <Link href="/dashboard/applications/form?section=general" className={`${buttonVariants({ variant: "default" })} sm:w-[250px] w-full`}>Crear aplicación</Link>
                </div>
        { applicationsData ?
          <>
            <MyAppsDesktopView transactionsData={sortedData} products={applicationsData as unknown as TQuickView[]} />
            <MyAppsMobileView transactionsData={sortedData} products={applicationsData as unknown as TQuickView[]} />
          </> : <NoData entity="aplicaciones" />
        }
            </div>
        </main>
    )
}

export default MyAppsPage
