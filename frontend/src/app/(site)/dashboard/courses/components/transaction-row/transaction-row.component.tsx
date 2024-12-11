import Link from "next/link";
import Image from "next/image";
import { Td, TRow } from "@/components/table/table.component";

type Props = {
    customerName: string;
    amount: number;
    status: "Pending" | "Completed" | "Canceled";
    avatarUrl: string;
}

const TransactionRow = ({ customerName, amount, status, avatarUrl }: Props) => {
    return (
        <TRow>
            <Td className="w-[74px] h-[70px] flex justify-center items-center">
                <Image
                    priority
                    alt={`${customerName}'s avatar`}
                    src={avatarUrl}
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                />
            </Td>
            <Td className="w-[199px] text-left text-sm font-normal">
                <span>{customerName}</span>
            </Td>
            <Td className="w-[124px] text-sm font-normal text-center">
                <span>${amount}</span>
            </Td>
            <Td className="w-[134px] text-xs font-bold cursor-default">
                <div
                    className={`flex items-center gap-2 rounded-full ${status === "Pending"
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
            </Td>
            <Td className="text-left">
                <Link
                    href="#"
                    className="w-[150px] text-center font-semibod text-[15px] text-primary-300 inline-block"
                >
                    Ver detalle
                </Link>
            </Td>
        </TRow>
    )
}

export default TransactionRow