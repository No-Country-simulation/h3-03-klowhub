'use client';

//import { useState } from 'react';
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { CourseHeader } from './detail-header.section';
import { CourseProps } from '@/types/course-detail-props';
import { LessonList } from './lesson-list-section';
import { InstructorInfo } from './instructor-section';
import { ObjectivesList } from './objectives.section';
import { ShareSection } from './share-section';
import { AdditionalDetails } from './additional-details.section';
import { RequirementsSection } from './requirements-section';
import { IncludeSection } from './include-section';
import { CourseInfoSection } from './info.section';
import { reviews } from '@/mocks/reviews.mocks';
import { ReviewsSection } from './reviews.section';
import { useSearchParams, usePathname } from 'next/navigation';

export const CourseInfo: FC<CourseProps> = ({
    details,
    lessons,
    instructor,
    objectives,
    about,
    additionalDetails,
    requirements,
    appInfoSections,
}) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();

    const isExpanded = searchParams.get('isExpanded') === 'true';

    return (
        <div className="md:col-span-2 space-y-4">
            <CourseHeader details={details} />
            <LessonList lessons={lessons} />
            <div className="space-y-4" id='detail-container'>
                <InstructorInfo instructor={instructor} />
                <h3 className="text-sm font-semibold">Después de completar este curso, serás capaz de</h3>
                <ObjectivesList objectives={objectives} />
                <h3 className="text-sm font-semibold">Acerca de este curso</h3>
                <div>
                    <p className={`text-sm ${isExpanded ? 'text-gray-300' : 'text-gradient-mask'}`}>
                        {about}
                    </p>
                </div>

                <div className={`${isExpanded ? 'block space-y-6 overflow-hidden' : 'hidden'}`}>

                    <Button className="mt-3 px-20">Añadir al Carrito</Button>

                    <ShareSection />

                    <AdditionalDetails details={additionalDetails} />

                    <RequirementsSection requirements={requirements} />

                    <IncludeSection />

                    <CourseInfoSection sections={appInfoSections.sections} />

                    <ReviewsSection reviews={reviews} />

                </div>
            </div>
            <div className='w-full text-center'>
                <Link
                    href={`${pathname}?isExpanded=${!isExpanded}#detail-container`}
                    className="text-purple-400"
                    scroll={!isExpanded ? false : true}
                >
                    {isExpanded ? "Ver menos" : "Ver más"}
                </Link>
            </div>
        </div>
    );

};
