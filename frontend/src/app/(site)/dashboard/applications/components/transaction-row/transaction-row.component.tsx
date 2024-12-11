import Link from "next/link";
import Image from "next/image";
import { Td, TRow } from "@/components/table/table.component";

type Props = {
    customerName: string;
    amount: number;
    platform: string
    avatarUrl: string;
}

const TransactionRow = ({ customerName, amount, platform, avatarUrl }: Props) => {
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
                    className={`flex w-fit items-center gap-2 rounded-full mx-auto ${platform === "AppSheet"
                        ? "text-[#4DE853] bg-[#4DE853]/15 border-1 border-[#4DE853]"
                        : "text-[#07B8C3] bg-[#07B8C3]/15 border-1 border-[#07B8C3]"
                        } py-2 px-4`}
                >
                    <span>
                        {platform === "AppSheet"
                            ? "AppSheet"
                            : "Power Apps"}
                    </span>
                </div>
            </Td>
            <Td></Td>
        </TRow>
    )
}

export default TransactionRow