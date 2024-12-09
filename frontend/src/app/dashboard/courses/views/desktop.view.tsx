import { Card, CardContent } from "@/components/ui/card";
import { getPathname, getQueryParams } from "@/utils/route.utils";
import TransactionRow from "../components/transaction-row/transaction-row.component";
import { startOfMonth, startOfYear, threeMonthsAgo, today } from "@/utils/date.utils";
import ProductCard from "@/components/product-card/product-card.component";
import { Transaction } from "@/types/transaction.types";
import SortingModal from "../components/sorting-modal/sorting-modal.component";
import DonutChart from "@/components/donut-chart/donut-chart.component";
import CustomTab from "@/components/custom-tab/custom-tab.component";
import { Table, TableBody, TableHead, Th } from "@/components/table/table.component";
import { TProductCard, TQuickView } from "@/components/product-card/product-card.types";
import { calculateTotalCommissions, calculateTotalRevenue } from "@/utils/transactions.utils";
import DatePickerWithRange from "@/components/date-picker/date-range-picker";

type Props = {
    transactionsData: Transaction[]
    products: TQuickView[]
}

const MyCoursesDesktopView = async ({ transactionsData, products }: Props) => {

    const pathname = await getPathname();
    const { filterBy, sortBy, from, to, order } = await getQueryParams();

    const totalRevenue = calculateTotalRevenue(transactionsData);
    const totalCommissions = calculateTotalCommissions(transactionsData);

    return (
        <div className="hidden md:flex flex-col gap-14">
            <Card className="py-5 mx-auto">
                <CardContent className="flex flex-col gap-14 w-full">
                    <div className="flex flex-col lg:flex-row gap-5 pl-5 lg:pl-0 lg:justify-between xl:w-2/3 w-full">
                        <div>
                            <CustomTab section={`section=transactions&filterBy=limit&items=5&sortBy=${sortBy}&order=${order}`}>Últimos movimientos</CustomTab>
                            <CustomTab section={`section=transactions&filterBy=date&from=${startOfMonth}&to=${today}&sortBy=${sortBy}&order=${order}`}>Este mes</CustomTab>
                            <CustomTab section={`section=transactions&filterBy=date&from=${threeMonthsAgo}&to=${today}&sortBy=${sortBy}&order=${order}`}>3 Meses</CustomTab>
                            <CustomTab section={`section=transactions&filterBy=date&from=${startOfYear}&to=${today}&sortBy=${sortBy}&order=${order}`}>Este año</CustomTab>
                        </div>
                        <div className="flex gap-4">
                            <DatePickerWithRange from={from} to={to} pathname={pathname} sortBy={sortBy} order={order} />
                            <SortingModal pathname={pathname} filterBy={filterBy} from={from} to={to} sortBy={sortBy} order={order} />
                        </div>
                    </div>
                    <div className="px-5 flex gap-5 xl:flex-row flex-col">
                        <div className="xl:w-3/4 w-full flex flex-col">
                            <Table>
                                <TableHead>
                                    <Th className="w-[199px] text-left">Nombre del cliente</Th>
                                    <Th className="w-[124px] text-center">Monto</Th>
                                    <Th className="py-4 px-3 w-[134px] text-center">Estado</Th>
                                </TableHead>
                                <TableBody>
                                    {
                                        transactionsData.map(({ id, customerName, amount, status, avatarUrl }) =>
                                            <TransactionRow key={id} customerName={customerName} amount={amount} status={status} avatarUrl={avatarUrl} />
                                        )
                                    }
                                </TableBody>
                            </Table>
                            {transactionsData.length === 0 && <span className="text-center p-5">No hay datos que mostrar.</span>}
                        </div>
                        <div className="xl:w-1/4 w-full p-5 flex bg-white/10 justify-center items-center relative">
                            <DonutChart
                                totalRevenue={totalRevenue}
                                totalCommissions={totalCommissions}
                                revenueColor="#9333ea"
                                commissionColor="#e6d5ff"
                                title="Balance de cursos"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="px-5 flex flex-col gap-5">
                <span className="text-base font-bold">Cursos creados</span>
                <div
                    className="grid grid-cols-1 gap-5
                                            md:grid-cols-2 md:px-0
                                            lg:grid-cols-2
                                            xl:grid-cols-3"
                >
                    {products.map((data, idx) => (
                        <ProductCard
                            key={`product-card-${idx}`}
                            data={data}
                            onlyInfo
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyCoursesDesktopView;
