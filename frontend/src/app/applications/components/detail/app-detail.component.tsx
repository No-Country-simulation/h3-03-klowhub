"use client"

import { FC, ReactNode, useEffect, useState } from "react";
import { AppInfo } from "./app-info.section";
import { AppProps } from "./app-detail.types";
import { ShareSection } from "@/app/courses/components/detail/share-section";
import { CourseInfoSection } from "@/app/courses/components/detail/info.section";
import { ReviewsSection } from "@/app/courses/components/detail/reviews.section";
import { reviews } from "@/mocks/reviews.mocks";
import { InstructorDetail } from "@/app/courses/components/detail/instructor-detail.section";
import { instructor } from "@/mocks/instructor.mock";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon/icon.component";
import { Badge } from "@/components/ui/badge";
import { AppInclude } from './app-include.section';
import { Popover } from "@/components/popover/popover.component";
import { useApplicationData } from "./hooks/use-application-data.hook";

type Props = {
    children?: ReactNode
}

export const AppDetail: FC<Props> = () => {

    // const [data, setData] = useState<AppProps>();
    const { pageData, submitCourse } = useApplicationData();
    const [showGreeter, setShowGreeter] = useState(false);

    // useEffect(() => {
    //
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch("/temp/json/app-detail.json");
    //             const result = await response.json();
    //             setData(result);
    //         } catch (error) {
    //             console.error("error fetching data:", error);
    //         }
    //     };
    //
    //     fetchData();
    //
    // }, []);

    const handleShowDesktopView = () => {
        setShowGreeter(true)
    }

    const handleCloseDesktopView = () => {
        setShowGreeter(false);
    }

    return pageData && (
        <div className="min-h-screen">
            <div className="mt-8 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-14">
                    <AppInfo {...pageData.applicationData}>
                        <ShareSection />
                        {/* <AppPeechSection */}
                        {/*     peechTitle={pageData.applicationData.pitchTitle} */}
                        {/*     peechDescription={data.peechDescription} */}
                        {/* /> */}
                        <CourseInfoSection
                            sector={pageData.applicationData.sector}
                            toolsAndPlatforms={pageData.applicationData.toolsAndPlatforms}
                            functionalities={pageData.applicationData.functionalities}
                            tags={pageData.applicationData.tags}
                        />
                        <ReviewsSection reviews={reviews} />
                    </AppInfo>
                <div className="space-y-6">

                        <div className="flex flex-col items-center gap-6 mt-4">
                            <Image
                                src={pageData.applicationData.mobileScreenshoot.fileMetadata.url}
                                alt={pageData.applicationData.mobileScreenshoot.fileMetadata.alt}
                                height={pageData.applicationData.mobileScreenshoot.fileMetadata.height}
                                width={pageData.applicationData.mobileScreenshoot.fileMetadata.width}
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
                        title={pageData?.applicationData.name}
                        appIncludes={pageData?.applicationData.appIncludes}
                    />

                </div>
            </div>
            {showGreeter && (
                <Popover onClose={handleCloseDesktopView}>
                    <Image
                        className="w-ful h-full rounded-lg"
                        src={pageData.applicationData.desktopScreenshot.fileMetadata.url}
                        alt={pageData.applicationData.desktopScreenshot.fileMetadata.alt}
                        height={pageData.applicationData.desktopScreenshot.fileMetadata.height}
                        width={pageData.applicationData.desktopScreenshot.fileMetadata.width}
                    />
                </Popover>
            )}
        </div>
    );

};
