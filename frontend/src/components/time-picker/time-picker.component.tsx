"use client";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const TimePicker: FC<TimePicker> = ({ className }) => {
  const mockTimeSlots = [
    { time: "9:00", index: 0 },
    { time: "9:00", index: 1 },
    { time: "9:00", index: 2 },
    { time: "9:30", index: 3 },
    { time: "9:30", index: 4 },
    { time: "9:30", index: 5 },
    { time: "10:00", index: 6 },
    { time: "10:00", index: 7 },
    { time: "10:00", index: 8 },
  ];

  const [timeSelected, setTimeSelected] = useState<{
    time: string;
    index: number;
  } | null>(null);

  return (
    <div
      className={cn(
        "w-[354px] bg-white/5 border border-[#E7E7E7] rounded-lg p-5 grid grid-cols-3 gap-x-5 gap-y-3",
        className
      )}
    >
      {mockTimeSlots.map((timeSlot) => (
        <Button
          key={timeSlot.index}
          className={`w-[86px] h-[48px] rounded-lg text-sm font-semibold ${
            timeSelected?.index === timeSlot.index
              ? "bg-primary/90 text-primary-foreground"
              : "bg-white/10 text-primary-100"
          }`}
          onClick={() => setTimeSelected(timeSlot)}
        >
          {timeSlot.time}
        </Button>
      ))}
    </div>
  );
};

export default TimePicker;
