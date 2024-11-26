"use client";
import React, { FC, useState } from "react";
import Icon from "../icon/icon.component";
import useCalendar from "./date-picker.utils";
import { CalendarDay } from "./date-picker.types";
import { CalendarGrid, CalendarHeader, CalendarWeekDaysHeader } from "./calendar.component";

const DatePicker: FC = () => {
  const {
    monthName,
    year,
    calendarData,
    goToPreviousMonth,
    goToNextMonth,
    getFirstDayIndex,
    compareDates,
    isPastDay,
  } = useCalendar();

  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [enableTransitionColors, setEnableTransitionColors] = useState(true);

  const handleMonthChange = (changeMonth: () => void) => {
    setSelectedDay(null);
    setEnableTransitionColors(false);
    setTimeout(() => {
      changeMonth();
      setEnableTransitionColors(true);
    }, 0);
  };

  return (
    <div className="flex flex-col gap-5">
      <CalendarHeader>
        <span className="text-sm font-semibold">
          {monthName} {year}
        </span>
        <div className="flex gap-3">
          <button
            className="w-6 h-6 rounded hover:bg-white hover:bg-opacity-5"
            onClick={() => handleMonthChange(goToPreviousMonth)}
          >
            <div className="rotate-180">
              <Icon name="arrow" />
            </div>
          </button>
          <button
            className="w-6 h-6 rounded hover:bg-white hover:bg-opacity-5"
            onClick={() => handleMonthChange(goToNextMonth)}
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
            const isNotAvailableDay = isPastDay(day);
            let isDaySelected = false
            if (selectedDay) {
              isDaySelected = compareDates(selectedDay.dayDate, day.dayDate);
            }

            return (
              <li key={index}>
                {isNotAvailableDay ? (
                  <div className="w-[35px] h-[35px] text-gray-500 rounded-full flex justify-center items-center text-sm font-semibold cursor-default">
                    {day.dayOfMonth}
                  </div>
                ) : (
                  <button
                    className={`w-[35px] h-[35px] text-sm font-semibold flex justify-center items-center rounded-full hover:bg-primary/90 ${enableTransitionColors ? "transition-colors" : ""
                      } ${isDaySelected
                        ? "bg-primary/90 text-primary-foreground"
                        : `bg-transparent text-primary-100`
                      }`}
                    onClick={() => setSelectedDay(day)}
                  >
                    {day.dayOfMonth}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </CalendarGrid>
    </div>
  );
};

export default DatePicker;
