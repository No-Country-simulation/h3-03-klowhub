import Link from "next/link";
import { getPathname, getQueryParams } from "@/utils/route.utils";
import { ReactNode } from "react";

type Props = {
    section: string;
    children: ReactNode;
};

const CustomTab = async ({ children, section }: Props) => {
    const pathname = await getPathname();
    const queryParams = await getQueryParams();

    const buildUrl = (section: string) => {
        const sections = section.split('&');
        const newParams: { [key: string]: string } = {};

        sections.forEach((item) => {
            const [key, value] = item.split('=');
            if (key && value) {
                newParams[key] = value;
            }
        });

        const queryString = new URLSearchParams(newParams).toString();
        return `${pathname}?${queryString}`;
    };

    const isActive = buildUrl(section) === `${pathname}?${new URLSearchParams(queryParams).toString()}`;

    return (
        <Link
            href={buildUrl(section)}
            className={`
                inline-block border-b-2 border-solid px-4 pb-2 font-bold text-sm
                ${isActive ? "text-primary-300 border-primary-300" : "border-white"}`}
        >
            {children}
        </Link>
    );
};

export default CustomTab;