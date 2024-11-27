import CourseCard from "@/app/(site)/dashboard/courses/_components/course-card/course-card.component";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ListOrdered, Shovel } from "lucide-react";
import Image from "next/image";
import { startOfMonth, startOfYear, threeMonthsAgo, today } from "../_utils/my-courses.utils";
import CustomTab from "../../../../../components/custom-tab/custom-tab.component";
import { Table, TableBody, TableHead, Td, Th, TRow } from "../../../../../components/table/table.component";
import DatePickerWithRange from "../../../../../components/date-picker/date-range-picker";
import { getPathname, getQueryParams } from "@/utils/route.utils";
import TransactionRow from "../_components/transaction-row/transaction-row.component";

type Props = {
    soldCoursesData: SoldCourse[]
    transactionsData: Transaction[]
}

const MyCoursesDesktopView = async ({ transactionsData, soldCoursesData }: Props) => {

    const pathname = await getPathname();
    const { from, to } = await getQueryParams();

    return (
        <Card className="hidden md:flex py-5 mx-auto">
            <CardContent className="flex flex-col gap-14">
                <div className="flex justify-between xl:w-2/3 w-full">
                    <div>
                        <CustomTab section="section=transactions&filterBy=limit&items=5">Últimos movimientos</CustomTab>
                        <CustomTab section={`section=transactions&filterBy=date&from=${startOfMonth}&to=${today}`}>Este mes</CustomTab>
                        <CustomTab section={`section=transactions&filterBy=date&from=${threeMonthsAgo}&to=${today}`}>3 Meses</CustomTab>
                        <CustomTab section={`section=transactions&filterBy=date&from=${startOfYear}&to=${today}`}>Este año</CustomTab>
                    </div>
                    <div className="flex gap-4">
                        <DatePickerWithRange from={from} to={to} pathname={pathname} />
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-[#D194E2] bg-transparent text-[#D194E2]"
                        >
                            <ListOrdered />
                            <span className="hidden md:block">Ordenar por</span>
                        </Button>
                    </div>
                </div>
                <div className="px-5 flex gap-5 xl:flex-row flex-col">
                    {/*<TransactionsTable />*/}
                    <Table>
                        <TableHead>
                            <Th className="w-[199px] text-left">Nombre del cliente</Th>
                            <Th className="w-[124px] text-center">Monto</Th>
                            <Th className="py-4 px-3 w-[134px] text-center">Estado</Th>
                        </TableHead>
                        <TableBody>
                            {transactionsData.length === 0 && <TRow className="absolute"><td>No hay datos que mostrar.</td></TRow>}
                            {
                                transactionsData.map(({ id, customerName, amount, status, avatarUrl }) =>
                                    <TransactionRow key={id} customerName={customerName} amount={amount} status={status} avatarUrl={avatarUrl} />
                                )
                            }
                        </TableBody>
                    </Table>
                    <div className="xl:w-1/4 w-full p-5 flex bg-white/10 justify-center items-center relative">
                        <Image
                            alt="some description"
                            width={200}
                            height={200}
                            src={
                                "https://res.cloudinary.com/dpp28f2ek/image/upload/v1732045469/chart_nfplid.png"
                            }
                        />

                        <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center gap-2">
                            <Shovel className="text-white w-8 h-8" />
                            <span className="text-white text-lg font-bold">
                                En construcción
                            </span>
                        </div>
                    </div>
                </div>
                <div className="px-5 flex flex-col gap-5">
                    <span className="text-base font-bold">Cursos creados</span>
                    <div
                        className="grid grid-cols-1 gap-5
                                            md:grid-cols-2 md:px-0
                                            lg:grid-cols-2
                                            xl:grid-cols-3"
                    >
                        {soldCoursesData.map((course, index) => (
                            <CourseCard key={index} course={course} />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default MyCoursesDesktopView;
