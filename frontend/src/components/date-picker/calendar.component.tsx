import { FC } from "react";

const CalendarHeader: FC<React.HTMLAttributes<HTMLDivElement>> = ({
    ...props
}) => <div className="flex justify-between items-center px-4" {...props} />;

const CalendarGrid: FC<React.HTMLAttributes<HTMLDivElement>> = ({
    ...props
}) => {
    return (
        <div className="px-2">
            <div
                className="w-[341px] bg-white/5 border-1 border-[#E7E7E7] rounded-lg px-3 py-5 flex flex-col gap-3"
                {...props}
            />
        </div>
    );
};

const CalendarWeekDaysHeader: FC = () => {
    return (
        <ul className="flex gap-3 text-sm font-semibold">
            <li className="w-[35px]">Dom</li>
            <li className="w-[35px]">Lun</li>
            <li className="w-[35px]">Mar</li>
            <li className="w-[35px]">Mie</li>
            <li className="w-[35px]">Jue</li>
            <li className="w-[35px]">Vie</li>
            <li className="w-[35px]">Sab</li>
        </ul>
    );
};

export {
    CalendarGrid,
    CalendarHeader,
    CalendarWeekDaysHeader
}