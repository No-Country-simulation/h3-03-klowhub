import { useState } from "react";
import { CalendarDay } from "./date-picker.types";

function useCalendar() {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const [currentDate, setCurrentDate] = useState(today);
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const monthName = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    const generateDaysOfMonth = (date: Date) => {
        const daysOfMonth: CalendarDay[] = [];
        const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const totalDays = lastDayOfMonth.getDate();

        for (let i = 1; i <= totalDays; i++) {
            const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
            daysOfMonth.push({
                dayOfMonth: i,
                dayDate: currentDate
            });
        }

        return daysOfMonth;
    };

    const getFirstDayIndex = () => {
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        return firstDayOfMonth.getDay();
    };

    const [calendarData, setCalendarData] = useState<CalendarDay[]>(generateDaysOfMonth(currentDate));

    const goToNextMonth = () => {
        setCurrentDate(prevDate => {
            const nextMonth = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
            setCalendarData(generateDaysOfMonth(nextMonth));
            return nextMonth;
        });
    };

    const goToPreviousMonth = () => {
        setCurrentDate(prevDate => {
            const previousMonth = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
            setCalendarData(generateDaysOfMonth(previousMonth));
            return previousMonth;
        });
    };

    const compareDates = (date1: CalendarDay | null, date2: CalendarDay | null) => {
        if (date1 === null || date2 === null) return null;
        return date1?.dayDate.toDateString() === date2.dayDate.toDateString();
    };

    const isPastDay = (day: CalendarDay) => {
        return day.dayDate < today
    };

    return {
        monthName,
        year,
        calendarData,
        generateDaysOfMonth,
        goToPreviousMonth,
        goToNextMonth,
        getFirstDayIndex,
        compareDates,
        isPastDay
    };
}

export default useCalendar;