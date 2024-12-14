import Link from "next/link";
import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component"
import { getQueryParams } from "@/utils/route.utils";
import { Inter } from "next/font/google";
import MyCoursesDesktopView from "./views/desktop.view";
import MyCoursesMobileView from "./views/mobile.view";
import { filterData, sortData } from "@/utils/filterdata.utils";

import { buttonVariants } from "@/components/ui/button";
import { transactionsData } from "@/mocks/transactions.mocks";
import { TQuickView } from "@/components/product-card/product-card.types";


const getProducts = async (endpoint: string) => {
    const res = await fetch(endpoint, { cache: "force-cache" });
    const items: TQuickView[] = await res.json();
    return items
};

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "400", "600", "700"],
    display: "swap",
});

const MyCoursesPage = async () => {

    const applications = await getProducts(process.env.NEXT_PUBLIC_APPLICATIONS_URL + "?withAuthor=true");

    const { sortBy, order, filterBy, from, to, items } = await getQueryParams();
    const filteredData = filterData(filterBy, { from: from, to: to, items: items }, transactionsData)
    const sortedData = sortData(sortBy, order, filteredData)

    return (
        <main className={`${inter.className} w-full tracking-wide pb-28`}>
            <div className="px-6 md:px-0 mx-auto">
                <BreadCrumb />
            </div>
            <div className="flex flex-col gap-5">
                <div className="mt-14 flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-center">
                    <h3 className="text-base font-bold">Mis cursos</h3>
                    <Link href="/dashboard/courses/form?section=general" className={`${buttonVariants({ variant: "default" })} sm:w-[250px] w-full`}>Crear curso</Link>
                </div>
                <MyCoursesDesktopView transactionsData={sortedData} products={applications} />
                <MyCoursesMobileView transactionsData={sortedData} products={applications} />
            </div>
        </main>
    )
}

export default MyCoursesPage
