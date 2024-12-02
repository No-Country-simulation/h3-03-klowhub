import { cn } from "@/lib/utils";

const Table = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLTableElement>) => (
    <table
        className={cn(
            "h-fit",
            className
        )}
        {...props}
    />
);

const TableHead = ({
    children,
    className
}: React.HTMLAttributes<HTMLTableSectionElement>) => (

    <thead className={cn(
        "hidden sm:table-header-group text-sm font-semibold border-b-8 border-card",
        className
    )}>
        <tr className="bg-white/10">
            <th className="w-[74px]"></th>
            {children}
            <th></th>
        </tr>
    </thead>
);

const Th = ({
    children,
    className
}: React.HTMLAttributes<HTMLTableCellElement>) => (

    <th className={cn(
        "py-4 px-3",
        className
    )}>{children}</th>
);

const TableBody = ({
    children,
    className
}: React.HTMLAttributes<HTMLTableSectionElement>) => (

    <tbody className={cn(
        "[&>tr>td]:p-3",
        className
    )}>{children}</tbody>
);

const TRow = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn(
        "bg-white/10 border-b-4 border-card",
        className
    )}
        {...props}
    />
);

const Td = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className={cn(
        "text-left",
        className
    )}
        {...props}
    />
);

export {
    Table,
    TableHead,
    Th,
    TableBody,
    TRow,
    Td
}