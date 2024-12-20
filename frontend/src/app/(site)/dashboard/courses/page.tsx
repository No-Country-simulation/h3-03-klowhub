import Link from "next/link";
import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component"
import { getQueryParams } from "@/utils/route.utils";
import MyCoursesDesktopView from "./views/desktop.view";
import MyCoursesMobileView from "./views/mobile.view";
import { filterData, sortData } from "@/utils/filterdata.utils";

import { buttonVariants } from "@/components/ui/button";
import { transactionsData } from "@/mocks/transactions.mocks";
import { TQuickView } from "@/components/product-card/product-card.types";
import NoData from "@/components/no-data/no-data.component";
import PublishButton from "@/components/publish-button/publish-button.component";


const getProducts = async (endpoint: string) => {
  try {
    const res = await fetch(endpoint, { cache: "force-cache" });
    const items: TQuickView[] = await res.json();
    
    // @ts-ignore: Unreachable code error
    if (items.statusCode) return [];

    return items
  } catch (err) {
    console.error("error while getting published courses: ", err)
  }
};

const MyCoursesPage = async () => {

    const applications = await getProducts(process.env.NEXT_PUBLIC_APPLICATIONS_URL + "?withAuthor=true");

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
                    <h3 className="text-base font-bold">Mis cursos</h3>
                    <PublishButton route="/dashboard/courses/form?section=general">Crear curso</PublishButton>
                </div>
        { applications ?
          <>
            <MyCoursesDesktopView transactionsData={sortedData} products={applications} />
            <MyCoursesMobileView transactionsData={sortedData} products={applications} />
          </> : <NoData entity="cursos" />
        }
            </div>
        </main>
    )
}

export default MyCoursesPage
