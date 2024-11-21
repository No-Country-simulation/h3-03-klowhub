import { soldCoursesData } from '@/mocks/sold-courses.mocks'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const SoldCoursesTable = () => {
    return (
        <table className="xl:w-3/4 w-full">
            <thead className="hidden sm:table-header-group text-sm font-semibold border-b-8 border-card">
                <tr className="bg-white/10">
                    <th className="w-[74px]"></th>
                    <th className="py-4 px-3 text-left w-[199px]">Nombre del cliente</th>
                    <th className="py-4 px-3 w-[124px] text-center">Monto</th>
                    <th className="py-4 px-3 w-[134px] text-center">Estado</th>
                    <th></th>
                </tr>
            </thead>

            <tbody className="[&>tr>td]:p-3">
                {soldCoursesData.map(({ id, customerName, courseName, amount, status, avatarUrl }) => (
                    <tr key={id} className="bg-white/10 border-b-4 border-card">
                        <td className="w-[74px] h-[70px] flex justify-center items-center">
                            <Image
                                priority
                                alt={`${customerName}'s avatar`}
                                src={avatarUrl}
                                width={50}
                                height={50}
                                className="w-[50px] h-[50px] rounded-full object-cover"
                            />
                        </td>
                        <td className="w-[199px] text-left text-sm font-normal">
                            <span>{customerName}</span>
                        </td>
                        <td className="w-[124px] text-sm font-normal text-center">
                            <span>${amount}</span>
                        </td>
                        <td className="w-[134px] text-xs font-bold cursor-default">
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
                        </td>
                        <td className="text-left">
                            <Link
                                href="#"
                                className="w-[150px] text-center font-semibod text-[15px] text-primary-300 inline-block"
                            >
                                Ver detalle
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default SoldCoursesTable