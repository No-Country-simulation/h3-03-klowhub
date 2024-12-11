"use client";

import { usePathname } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadCrumb = ({ title }: { title?: string }) => {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    return (
        <Breadcrumb className="mt-6">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink className="text-white text-xs tracking-tight leading-5" href="/">
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {segments.length > 0 && (
                    <BreadcrumbSeparator className="text-white text-xs tracking-tight leading-5">/</BreadcrumbSeparator>
                )}

                {segments.map((segment, index) => {
                    const isLast = index === segments.length - 1;
                    const href = `/${segments.slice(0, index + 1).join("/")}`;

                    const label = isLast && title ? title : segment.replace(/-/g, " ");

                    return (
                        <BreadcrumbItem key={index}>
                            {isLast ? (
                                <BreadcrumbPage className="text-white text-xs tracking-tight leading-5 capitalize">
                                    {label}
                                </BreadcrumbPage>
                            ) : (
                                <>
                                    <BreadcrumbLink
                                        className="text-white text-xs tracking-tight leading-5 capitalize"
                                        href={href}
                                    >
                                        {label}
                                    </BreadcrumbLink>
                                    <BreadcrumbSeparator className="text-white text-xs tracking-tight leading-5">
                                        /
                                    </BreadcrumbSeparator>
                                </>
                            )}
                        </BreadcrumbItem>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadCrumb;
