"use client"

import { FC, ReactNode, useState } from "react";
import { AppInfo } from "./app-info.section";
import { ShareSection } from "@/app/courses/components/detail/share-section";
import PageFilters from "@/components/page-filters/page-filters.component";
import { ReviewsSection } from "@/app/courses/components/detail/reviews.section";
import { reviews } from "@/mocks/reviews.mocks";
import { InstructorDetail } from "@/app/courses/components/detail/instructor-detail.section";
import { instructor } from "@/mocks/instructor.mock";
import List from "@/components/list/list.component";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon/icon.component";
import { Badge } from "@/components/ui/badge";
import { AppInclude } from './app-include.section';
import { Popover } from "@/components/popover/popover.component";
import { useApplicationData } from "./hooks/use-application-data.hook";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";

type Props = {
    children?: ReactNode
}

export const AppDetail: FC<Props> = () => {

    // const [data, setData] = useState<AppProps>();
    const { pageData, submitApplication } = useApplicationData();
    console.log('pageData: ', pageData);
    const [showGreeter, setShowGreeter] = useState(false);
    const searchParams = useSearchParams();
    const section = searchParams.get("section");

    console.log('application data', pageData)

    const handleShowDesktopView = () => {
        setShowGreeter(true)
    }

    const handleCloseDesktopView = () => {
        setShowGreeter(false);
    }

    const filters = [
        { label: "Funcionalidades", items: pageData?.applicationData.functionalities || [] },
        { label: "Herramientas y plataformas", items: pageData?.applicationData.toolsAndPlatforms || [] },
        { label: "Sector", items: pageData?.applicationData.sector || [] },
        { label: "Tags", items: pageData?.applicationData.tags || [] },
    ];

    return pageData && (
        <>
            <BreadCrumb title={pageData.applicationData.title} />
            <div className="min-h-screen">
                <div className="mt-8 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-14">
                    <AppInfo {...pageData.applicationData} submitApplication={submitApplication}>
                        <ShareSection />
                        <List
                            header="Para quién es esta App"
                            subheader="Esta App de AppSheet es para ti sí:"
                            items={pageData.applicationData.targetAudience}
                        />
                        <List
                            header="Vistas de la App"
                            subheader="Estás serán las pantallas (Vistas) a las que podrás acceder desde la app de facturas de AppSheet:"
                            items={pageData.applicationData.views}
                        />
                        {/* <AppPeechSection */}
                        {/*     peechTitle={pageData.applicationData.pitchTitle} */}
                        {/*     peechDescription={data.peechDescription} */}
                        {/* /> */}
                        <PageFilters filters={filters} />
                        <ReviewsSection reviews={reviews} />
                    </AppInfo>
                    <div className="space-y-6">

                        <div className="flex flex-col items-center gap-6 mt-4">
                            <Image
                                src={pageData.applicationData.mobileLink}
                                alt=""
                                height={384}
                                width={192}
                                className="w-48 rounded-3xl h-96 border-8 border-[#374151]"
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-[#D194E2] text-[#D194E2]"
                                onClick={handleShowDesktopView}
                            >
                                Ver en modo escritorio
                            </Button>
                        </div>

                        <InstructorDetail
                            name={instructor.name}
                            description={instructor.description}
                            image={instructor.image}
                            rating={instructor.rating}
                            students={instructor.students}
                            courses={instructor.courses}
                            profileLink={instructor.profileLink}
                        />

                        <Badge
                            className="bg-[#1F2937] text-white w-full shadow-hrd flex justify-center"
                            icon={<Icon name="powerapps" style="w-8 h-8" />}
                        >
                            {pageData?.applicationData.platform}
                        </Badge>

                        <AppInclude
                            title={pageData?.applicationData.title}
                            appIncludes={pageData?.applicationData.appIncludes}
                        />

                        <Button
                            className={`w-full ${section === "preview" ? "bg-gray-400" : ""}`}
                            disabled={section === "preview"}
                        >
                            Comprar curso
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full"
                            disabled={section === "preview"}
                        >
                            <Link href="/cart">
                                Añadir al carrito
                            </Link>
                        </Button>

                    </div>
                </div>
                {showGreeter && (
                    <Popover onClose={handleCloseDesktopView}>
                        <Image
                            className="w-full h-full rounded-lg"
                            src={pageData.applicationData.desktopLink}
                            alt=""
                            width={1920}
                            height={1080}
                        />
                    </Popover>
                )}
            </div>
        </>
    );

};
