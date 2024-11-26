import { ListFilter, ListOrdered } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { getQueryParams } from "@/utils/route.utils";
import CustomTab from "../../../../../components/custom-tab/custom-tab.component";
import TransactionCard from "../_components/transaction-card/transaction-card.component";
import CourseCard from "../_components/course-card/course-card.component";

type Props = {
    soldCoursesData: SoldCourse[];
    transactionsData: Transaction[];
};

const MyCoursesMobileView = async ({
    transactionsData,
    soldCoursesData,
}: Props) => {
    const { section } = await getQueryParams();

    return (
        <div className="lg:hidden flex flex-col w-full gap-5">
            <div className="flex gap-4 w-full">
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-fit border-[#D194E2] bg-transparent text-[#D194E2]"
                >
                    <ListFilter />
                    <span className="block">Filtros</span>
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-fit border-[#D194E2] bg-transparent text-[#D194E2]"
                >
                    <ListOrdered />
                    <span className="block">Ordenar por</span>
                </Button>
            </div>
            <div>
                <CustomTab section="section=transactions&filterBy=limit&items=5">
                    Últimos movimientos
                </CustomTab>
                <CustomTab section="section=courses">Mis cursos</CustomTab>
            </div>
            {section === "transactions" && (
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
            )}
            {section === "courses" && (
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
            )}
        </div>
    );
};

export default MyCoursesMobileView;
