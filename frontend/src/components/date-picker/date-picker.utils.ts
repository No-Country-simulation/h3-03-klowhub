import { useState } from "react";
import { CalendarDay } from "./date-picker.types";

function useCalendar() {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const [currentDate, setCurrentDate] = useState(today);
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const shortMonthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
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

    const compareDates = (date1: Date, date2: Date): boolean => {
        return date1.toDateString() === date2.toDateString();
    };

    const isPastDay = (day: CalendarDay) => {
        return day.dayDate < today
    };

    const stringToDate = (dateString: string): Date => {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    const dateToString = (date: Date): string => {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatToShortDate = (dateString: string): string => {
        if (!dateString) return "--.--";
    
        const [year, month, day] = dateString.split("-").map(Number);
    
        const date = new Date(year, month - 1, day); 
    
        if (isNaN(date.getTime())) return "--.--";
    
        const options: Intl.DateTimeFormatOptions = {
            month: "short",
            day: "numeric",
            year: "numeric",
        };
    
        return date.toLocaleDateString("en-US", options);
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
        isPastDay,
        stringToDate,
        dateToString,
        formatToShortDate
    };
}

export default useCalendar;