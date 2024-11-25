import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadCrumb = () => {

    return (
        <Breadcrumb className="mt-6">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink className="text-white text-xs tracking-tight leading-5" href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white text-xs tracking-tight leading-5">/</BreadcrumbSeparator>
                <BreadcrumbItem>
                    <BreadcrumbPage className="text-white text-xs tracking-tight leading-5">Cursos y Lecciones</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white text-xs tracking-tight leading-5">/</BreadcrumbSeparator>
            </BreadcrumbList>
        </Breadcrumb>

    );

};

export default BreadCrumb
