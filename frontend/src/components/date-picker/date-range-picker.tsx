"use client";
import React, { useState } from "react";
import useCalendar from "./date-picker.utils";
import Icon from "../icon/icon.component";
import Link from "next/link";
import {
    CalendarGrid,
    CalendarHeader,
    CalendarWeekDaysHeader,
} from "./calendar.component";
import { CalendarSearch, X } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
    from: string;
    to: string;
    pathname: string;
};

const DatePickerWithRange = ({ from, to, pathname }: Props) => {
    const {
        monthName,
        year,
        calendarData,
        goToPreviousMonth,
        goToNextMonth,
        getFirstDayIndex,
        compareDates,
        stringToDate,
        dateToString,
        formatToShortDate
    } = useCalendar();

    const [isShow, setIsSHow] = useState(false);

    return (
        <div className="relative">
            <Button
                variant="outline"
                size="sm"
                className="border-[#D194E2] bg-transparent text-[#D194E2]"
                onClick={() => setIsSHow(!isShow)}
            >
                <CalendarSearch />
                <span className="hidden md:block">Filtrar por fecha</span>
            </Button>
            {isShow && (
                <div className="shadow-md bg-slate-900 rounded-lg flex flex-col gap-5 p-5 absolute right-0 top-2 w-fit">
                    <div className="flex justify-between">
                        <div className="flex gap-4">
                            <span className="pl-2 pr-7 py-2 bg-white bg-opacity-5 rounded-lg text-primary-100">{formatToShortDate(from)}</span>
                            <span className="pl-2 pr-7 py-2 bg-white bg-opacity-5 rounded-lg text-primary-100">{formatToShortDate(to)}</span>
                        </div>
                        <button onClick={() => setIsSHow(!isShow)}>
                            <X />
                        </button>
                    </div>
                    <CalendarHeader>
                        <div className="w-full flex justify-between">
                            <button
                                className="w-6 h-6 rounded hover:bg-white hover:bg-opacity-5"
                                onClick={() => goToPreviousMonth()}
                            >
                                <div className="rotate-180">
                                    <Icon name="arrow" />
                                </div>
                            </button>
                            <span className="text-sm font-semibold">
                                {monthName} {year}
                            </span>
                            <button
                                className="w-6 h-6 rounded hover:bg-white hover:bg-opacity-5"
                                onClick={() => goToNextMonth()}
                            >
                                <Icon name="arrow" />
                            </button>
                        </div>
                    </CalendarHeader>
                    <CalendarGrid>
                        <CalendarWeekDaysHeader />

                        <ul className="grid grid-cols-7 gap-3">
                            {Array(getFirstDayIndex())
                                .fill(null)
                                .map((_, index) => (
                                    <li
                                        key={`empty-${index}`}
                                        className="w-[35px] h-[35px] rounded-full"
                                    />
                                ))}
                            {calendarData.map((day, index) => {
                                const currentDate = day.dayDate;
                                let isFrom = false;
                                let isTo = false;
                                let isInRange = false;
                                let fromDate: Date | null = null;
                                let toDate: Date | null = null;

                                if (from) {
                                    fromDate = stringToDate(from);
                                    toDate = stringToDate(to);

                                    isFrom = compareDates(fromDate, currentDate);
                                    isTo = compareDates(toDate, currentDate);

                                    isInRange = currentDate > fromDate && currentDate < toDate;
                                }

                                const href = isFrom
                                    ? `${pathname}?section=transactions&filterBy=date&from=${from}&to=${from}`
                                    : isTo
                                        ? `${pathname}?section=transactions&filterBy=date&from=${to}&to=${to}`
                                        : isInRange
                                            ? Math.abs(currentDate.getTime() - fromDate!.getTime()) <
                                                Math.abs(toDate!.getTime() - currentDate.getTime())
                                                ? `${pathname}?section=transactions&filterBy=date&from=${dateToString(
                                                    currentDate
                                                )}&to=${to}`
                                                : `${pathname}?section=transactions&filterBy=date&from=${from}&to=${dateToString(
                                                    currentDate
                                                )}`
                                            : !fromDate || currentDate < fromDate
                                                ? `${pathname}?section=transactions&filterBy=date&from=${dateToString(
                                                    currentDate
                                                )}&to=${dateToString(
                                                    currentDate
                                                )}`
                                                : `${pathname}?section=transactions&filterBy=date&from=${from}&to=${dateToString(
                                                    currentDate
                                                )}`;

                                return (
                                    <li key={index}>
                                        <Link
                                            className={`w-[35px] h-[35px] text-sm font-semibold flex justify-center items-center rounded-full hover:bg-primary/90 ${isFrom || isTo
                                                ? "bg-primary-500 text-primary-foreground"
                                                : isInRange
                                                    ? "bg-gray-300 text-gray-800"
                                                    : "bg-transparent text-primary-100"
                                                }`}
                                            href={href}
                                        >
                                            {day.dayOfMonth}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </CalendarGrid>
                </div>
            )}
        </div>
    );
};

export default DatePickerWithRange;
