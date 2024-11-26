'use client';

import { useState } from 'react';
import { FC } from 'react';
import { Button } from '@/components/ui/button';

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

export const CourseDetail: FC<CourseProps> = ({ 
    details, 
    lessons, 
    instructor, 
    objectives, 
    about, 
    additionalDetails, 
    requirements,
    appInfoSections
}) => {

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="md:col-span-2 space-y-4">
            <CourseHeader details={details}/> 
            <LessonList lessons={lessons}/>
            <div className="space-y-4">
                <InstructorInfo instructor={instructor}/>
                <h3 className="text-sm font-semibold">Después de completar este curso, serás capaz de</h3>
                <ObjectivesList objectives={objectives}/>
                <h3 className="text-sm font-semibold">Acerca de este curso</h3>
                <div>
                    <p className={`text-sm ${isExpanded ? 'text-gray-300' : 'text-gradient-mask'}`}>
                        {about}
                    </p>
                </div>

                <div className={`${isExpanded ? 'block space-y-6 overflow-hidden' : 'hidden'}`}>

                    <Button className="mt-3 px-20">Añadir al Carrito</Button>

                    <ShareSection/>
                    
                    <AdditionalDetails details={additionalDetails}/>

                    <RequirementsSection requirements={requirements}/>

                    <IncludeSection/>
                    
                    <CourseInfoSection sections={appInfoSections.sections} />

                    <ReviewsSection reviews={reviews}/>
                    
                </div>
            </div>
            <Button
                variant="link"
                className="text-purple-400 flex items-center w-full"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? 'Ver menos' : 'Ver más'}
            </Button>
        </div>
    );

};
