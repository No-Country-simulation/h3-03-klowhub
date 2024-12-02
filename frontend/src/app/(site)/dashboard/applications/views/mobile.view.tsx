import { getPathname, getQueryParams } from "@/utils/route.utils";
import CustomTab from "../../../../../components/custom-tab/custom-tab.component";
import { QuickView as TQuickView } from "@/components/product-card/product-card.types";
import ProductCard from "@/components/product-card/product-card.component";
import TransactionCard from "@/components/transaction-card/transaction-card.component";
import { Transaction } from "@/types/transaction.types";
import FilterModal from "@/components/filter-modal/filter-modal.component";
import SortingModal from "../components/sorting-moda/sorting-modal.component";
import { calculateTotalCommissions, calculateTotalRevenue } from "@/utils/transactions.utils";
import DonutChart from "@/components/donut-chart/donut-chart.component";

type Props = {
    transactionsData: Transaction[]
    products: TQuickView[]
};

const MyAppsMobileView = async ({
    transactionsData,
    products
}: Props) => {
    const pathname = await getPathname();
    const { section, filterBy, sortBy, from, to, order } = await getQueryParams();

    const totalRevenue = calculateTotalRevenue(transactionsData);
    const totalCommissions = calculateTotalCommissions(transactionsData);

    return (
        <div className="md:hidden flex flex-col w-full gap-5">
            <div>
                <CustomTab section={`section=transactions&filterBy=limit&items=5&sortBy=${sortBy}&order=${order}`}>
                    Últimos movimientos
                </CustomTab>
                <CustomTab section="section=courses">Mis aplicaciones</CustomTab>
            </div>
            {(section === "transactions" || !section) && (
                <div className="flex flex-col gap-5">
                    <div className="flex gap-4 w-full">
                        <FilterModal pathname={pathname} from={from} to={to} sortBy={sortBy} order={order} filterBy={filterBy} />
                        <SortingModal pathname={pathname} filterBy={filterBy} from={from} to={to} sortBy={sortBy} order={order} />
                    </div>
                    <ul className="flex flex-col gap-3">
                        {transactionsData.length === 0 && <span>No hay datos que mostrar.</span>}
                        {transactionsData.map(
                            ({
                                id,
                                courseName,
                                date,
                                platform,
                                customerName,
                                amount,
                                status,
                                avatarUrl,
                            }) => (
                                <li key={id}>
                                    <TransactionCard
                                        courseName={courseName}
                                        date={date}
                                        platform={platform}
                                        customerName={customerName}
                                        amount={amount}
                                        status={status}
                                        avatarUrl={avatarUrl}
                                    />
                                </li>
                            )
                        )}
                    </ul>
                    <div className="xl:w-1/4 w-full p-5 flex bg-[#353e4b] justify-center items-center relative">
                        <DonutChart
                            totalRevenue={totalRevenue}
                            totalCommissions={totalCommissions}
                            revenueColor="#9333ea"
                            commissionColor="#e6d5ff"
                            title="Balance de cursos"
                        />
                    </div>
                </div>
            )}
            {section === "courses" && (
                <div
                    className="grid grid-cols-1 gap-5
                                    md:grid-cols-2 md:px-0
                                    lg:grid-cols-2
                                    xl:grid-cols-3"
                >
                    {products.map((data, idx) => (
                        <ProductCard
                            key={`product-card-${idx}`}
                            data={data.product}
                            onlyInfo
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyAppsMobileView;
