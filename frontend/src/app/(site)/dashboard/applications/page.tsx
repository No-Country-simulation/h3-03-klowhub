import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component"
import { Button } from "@/components/ui/button";
import { transactionsData } from "@/mocks/transactions.mocks";
import { getQueryParams } from "@/utils/route.utils";
import { Inter } from "next/font/google";
import { filterData, sortData } from "@/utils/filterdata.utils";
import { products } from "@/mocks/products.mocks";
import MyAppsDesktopView from "./views/desktop.view";
import MyAppsMobileView from "./views/mobile.view";
import DonutChart from "@/components/donut-chart/donut-chart.component";
import { calculateTotalCommissions, calculateTotalRevenue } from "@/utils/transactions.utils";

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "400", "600", "700"],
    display: "swap",
});

const MyAppsPage = async () => {

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
                    <h3 className="text-base font-bold">Mis aplicaciones</h3>
                    <Button className="sm:w-[250px] w-full">Crear aplicacion</Button>
                </div>
                <MyAppsDesktopView transactionsData={sortedData} products={products} />
                <MyAppsMobileView transactionsData={sortedData} products={products} />
            </div>
        </main>
    )
}

export default MyAppsPage