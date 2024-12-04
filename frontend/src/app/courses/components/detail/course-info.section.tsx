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
import { useSearchParams, usePathname, ReadonlyURLSearchParams } from 'next/navigation';

import { instructor } from '@/mocks/instructor.mock';

  const setParam = (key: string, value: string, searchParams: ReadonlyURLSearchParams) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value)
    return params.toString()
  };

export const CourseInfo: FC<CourseProps> = ({
    title,
    shortDescription,
    rating,
    ratingCount,
    freelessons, // comentar en caso de error
    learningSubjects,
    fullDescription,
    children,
    promotionalVideo
}) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();

    const isExpanded = searchParams.get('isExpanded') === 'true';


    return (
        <div className="md:col-span-2 space-y-4">
                <CourseHeader
                    title={title}
                    summarizeDescription={shortDescription}
                    rating={rating}
                    ratingCount={ratingCount}
                    promotionalVideo={promotionalVideo}
                    lessons={freelessons}
                />
            {/* <LessonList lessons={freelessons} /> */}
            <div className="space-y-4" id='detail-container'>
                <InstructorInfo instructor={instructor} />
                <h3 className="text-sm font-semibold">Después de completar este curso, serás capaz de</h3>
                <ObjectivesList objectives={learningSubjects} />
                <h3 className="text-sm font-semibold">Acerca de este curso</h3>
                <div>
                    <p className={`text-sm ${isExpanded ? 'text-gray-300' : 'text-gradient-mask'}`}>
                        {fullDescription}
                    </p>
                </div>

                <div className={`${isExpanded ? 'block space-y-6 overflow-hidden' : 'hidden'}`}>

                    <Button className="mt-3 px-20">Añadir al Carrito</Button>

                    {children}


                </div>
            </div>
            <div className='w-full text-center'>
                <Link
                    href={`${pathname}?${setParam("isExpanded", String(!isExpanded), searchParams)}#detail-container`}
                    className="text-purple-400"
                    scroll={!isExpanded ? false : true}
                >
                    {isExpanded ? "Ver menos" : "Ver más"}
                </Link>
            </div>
        </div>
    );

};
