'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useClickOutside from '@/hooks/use-click-outside.hook';
import { startOfMonth, startOfYear, threeMonthsAgo, today } from '@/utils/date.utils';
import { ListFilter, ListOrdered } from 'lucide-react';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

type Props = {
    pathname: string;
    from: string;
    to: string;
    sortBy: string;
    order: string;
    filterBy: string
};

const FilterModal = ({ pathname, from, to, sortBy, order, filterBy }: Props) => {
    const [isShow, setIsShow] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useClickOutside(menuRef, () => setIsShow(false));

    return (
        <div className="relative z-[10] w-full sm:w-fit" ref={menuRef}>
            <Button
                variant="outline"
                size="sm"
                className="border-[#D194E2] bg-transparent text-[#D194E2] w-full"
                onClick={() => setIsShow(!isShow)}
            >
                <ListFilter />
                <span className="block">Filtros</span>
            </Button>
            {isShow && (
                <Card className="w-[214px] p-2 bg-[#1F2937] absolute right-0 sm:left-0">
                    <ul className="text-sm font-semibold flex flex-col gap-1">
                        <li>
                            <Link
                                className={`block rounded-lg p-3.5 hover:bg-[#353E4B] ${filterBy === "limit" && "bg-[#353E4B]"}`}
                                href={`${pathname}?section=transactions&filterBy=limit&items=5&sortBy=${sortBy}&order=${order}`}
                            >
                                Últimos movimientos
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`block rounded-lg p-3.5 hover:bg-[#353E4B] ${from === startOfMonth && to === today && "bg-[#353E4B]"}`}
                                href={`${pathname}?section=transactions&filterBy=date&from=${startOfMonth}&to=${today}&sortBy=${sortBy}&order=${order}`}
                            >
                                Este mes
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`block rounded-lg p-3.5 hover:bg-[#353E4B] ${from === threeMonthsAgo && to === today && "bg-[#353E4B]"}`}
                                href={`${pathname}?section=transactions&filterBy=date&from=${threeMonthsAgo}&to=${today}&sortBy=${sortBy}&order=${order}`}
                            >
                                3 Meses
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`block rounded-lg p-3.5 hover:bg-[#353E4B] ${from === startOfYear && to === today && "bg-[#353E4B]"}`}
                                href={`${pathname}?section=transactions&filterBy=date&from=${startOfYear}&to=${today}&sortBy=${sortBy}&order=${order}`}
                            >
                                Este año
                            </Link>
                        </li>
                    </ul>
                </Card>
            )}
        </div>
    );
};

export default FilterModal;