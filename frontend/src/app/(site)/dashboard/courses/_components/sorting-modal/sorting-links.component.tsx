'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useClickOutside from '@/hooks/use-click-outside.hook';
import { ListOrdered } from 'lucide-react';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

type Props = {
    pathname: string;
    filterBy: string;
    from: string;
    to: string;
    sortBy: string;
    order: string;
};

const SortingLinks = ({ pathname, filterBy, from, to, sortBy, order }: Props) => {
    const [isShow, setIsShow] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useClickOutside(menuRef, () => setIsShow(false));

    let baseHref = `${pathname}?section=transactions&filterBy=limit&items=5`;

    if (filterBy) {
        switch (filterBy) {
            case "date":
                baseHref = `${pathname}?section=transactions&filterBy=date&from=${from}&to=${to}`;
                break;
            case "limit":
                baseHref = `${pathname}?section=transactions&filterBy=limit&items=5`;
                break;
            default:
                baseHref = `${pathname}?section=transactions&filterBy=limit&items=5`;
                break;
        }
    }

    const sortingOptions = [
        { label: "Nombre del Cliente", query: "&sortBy=customerName&order=asc", sortBy: "customerName", order: "asc" },
        { label: "Mayor precio", query: "&sortBy=amount&order=asc", sortBy: "amount", order: "asc" },
        { label: "Menor precio", query: "&sortBy=amount&order=desc", sortBy: "amount", order: "desc" },
        { label: "Estado", query: "&sortBy=state&order=asc", sortBy: "state", order: "asc" },
        { label: "Más recientes", query: "&sortBy=date&order=asc", sortBy: "date", order: "asc" },
        { label: "Menos recientes", query: "&sortBy=date&order=desc", sortBy: "date", order: "desc" },
    ];

    return (
        <div className="relative" ref={menuRef}>
            <Button
                variant="outline"
                size="sm"
                className="border-[#D194E2] bg-transparent text-[#D194E2]"
                onClick={() => setIsShow(!isShow)}
            >
                <ListOrdered />
                <span className="hidden md:block">Ordenar por</span>
            </Button>
            {isShow && (
                <Card className="w-[214px] p-2 bg-[#1F2937] absolute">
                    <ul className="text-sm font-semibold flex flex-col gap-1">
                        {sortingOptions.map((option) => {
                            const isActive = option.sortBy === sortBy && option.order === order;

                            return (
                                <li key={option.label}>
                                    <Link
                                        className={`block rounded-lg p-3.5 hover:bg-[#353E4B] ${isActive ? "bg-[#353E4B] text-primary-200" : ""
                                            }`}
                                        href={`${baseHref}${option.query}`}
                                    >
                                        {option.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </Card>
            )}
        </div>
    );
};

export default SortingLinks;