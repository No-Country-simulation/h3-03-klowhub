import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardSection } from "../../../../../../components/ui/card";
import { Badge } from "../../../../../../components/ui/badge";
import Icon from "../../../../../../components/icon/icon.component";
import { getSlug } from "@/utils/str.utils";

type Props = {
    courseName: string;
    date: string;
    platform: string;
    customerName: string;
    amount: number;
    status: "Pending" | "Completed" | "Canceled";
    avatarUrl: string;
}

const TransactionCard = ({ courseName, date, platform, customerName, amount, status, avatarUrl }: Props) => {
    return (
        <Card className="p-3">
            <CardContent>
                <ul className="flex flex-col gap-3">
                    <li>
                        <span className="text-sm">{courseName}</span>
                    </li>
                    <li>
                        <CardSection className="flex items-center justify-between py-2 px-1.5">
                            <span className="w-[100px] text-sm font-semibold">
                                Monto
                            </span>
                            <span className="w-[191px] text-xs text-center">
                                {amount}
                            </span>
                        </CardSection>
                    </li>
                    <li>
                        <CardSection className="flex items-center justify-between px-1.5 py-1">
                            <span className="w-[100px] text-sm font-semibold py-2">
                                Estado
                            </span>
                            <div className="w-[191px] text-xs flex justify-center">
                                <div
                                    className={`flex items-center gap-2 rounded-full w-fit ${status === "Pending"
                                        ? "text-[#C1D931] bg-[#C1D931]/15"
                                        : status === "Completed"
                                            ? "text-[#00A86B] bg-[#00A86B]/15"
                                            : "text-[#FF6347] bg-[#FF6347]/15"
                                        } py-2 px-4`}
                                >
                                    <div
                                        className={`w-1.5 h-1.5 rounded-full ${status === "Pending"
                                            ? "bg-[#C1D931]"
                                            : status === "Completed"
                                                ? "bg-[#00A86B]"
                                                : "bg-[#FF6347]"
                                            }`}
                                    ></div>
                                    <span>
                                        {status === "Pending"
                                            ? "Pendiente"
                                            : status === "Completed"
                                                ? "Completado"
                                                : "Cancelado"}
                                    </span>
                                </div>
                            </div>
                        </CardSection>
                    </li>
                    <li>
                        <CardSection className="flex items-center justify-between py-2 px-1.5">
                            <span className="w-[100px] text-sm font-semibold">
                                Plataforma
                            </span>
                            <span className="w-[191px] text-xs text-center">
                                <Badge
                                    icon={
                                        <Icon
                                            name={
                                                getSlug(platform) === "appsheet"
                                                    ? "app-sheet"
                                                    : "power-apps"
                                            }
                                        />
                                    }
                                    className="bg-transparent text-white w-[144px] py-0"
                                >
                                    {platform}
                                </Badge>
                            </span>
                        </CardSection>
                    </li>
                    <li>
                        <CardSection className="flex items-center justify-between py-2 px-1.5">
                            <span className="w-[100px] text-sm font-semibold">
                                Fecha
                            </span>
                            <span className="w-[191px] text-xs text-center">
                                {date}
                            </span>
                        </CardSection>
                    </li>
                    <li>
                        <CardSection className="flex items-center justify-center gap-6 py-1 px-6">
                            <Image
                                priority
                                alt={`${customerName}'s avatar`}
                                src={avatarUrl}
                                width={50}
                                height={50}
                                className="w-[50px] h-[50px] rounded-full object-cover"
                            />
                            <span className="w-fit text-sm">
                                {customerName}
                            </span>
                        </CardSection>
                    </li>
                    <li className="w-full flex justify-center">
                        <Link className="font-[600] text-sm text-[#D194E2] tracking-wider w-[140px] py-1 flex justify-center" href={"#"}>Ver detalles</Link>
                    </li>
                </ul>
            </CardContent>
        </Card>
    )
}

export default TransactionCard