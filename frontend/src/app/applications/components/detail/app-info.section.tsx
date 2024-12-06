import { FC } from "react";
import { AppProps } from "./app-detail.types";
import { AppHeader } from "./app-detail-header.section";
import { instructor } from "@/mocks/instructor.mock";
import { InstructorInfo } from "@/app/courses/components/detail/instructor-section";
import { ObjectivesList } from "@/app/courses/components/detail/objectives.section";

import { useSearchParams, usePathname } from 'next/navigation';
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const AppInfo: FC<AppProps> = ({
    title, 
    shortDescription,
    fullDescription,
    rating,
    ratingCount, 
    coverImg,
    advantages,
    children,
}) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();

    const isExpanded = searchParams.get('isExpanded') === 'true';

    return (
        <div className="md:col-span-2 space-y-4">
            {rating && ratingCount && (
                <AppHeader
                    title={title}
                    shortDescription={shortDescription}
                    rating={rating}
                    ratingCount={ratingCount}
                    coverImg={coverImg}
                />
            )}
            <div className="space-y-4" id='detail-container'>
                <InstructorInfo instructor={instructor}/>
                <h3 className="text-sm font-semibold">Después de adquirir esta app, serás capaz de</h3>
                <ObjectivesList objectives={advantages} />
                <h3 className="text-sm font-semibold">Acerca de esta app</h3>
                <div>
                    <p className={`text-sm ${isExpanded ? 'text-gray-300' : 'text-gradient-mask'}`}>
                        {fullDescription}
                    </p>
                </div>

                <div className={`${isExpanded ? 'block space-y-6 overflow-hidden' : 'hidden'}`}>

                    <Button className="mt-3 px-20">COMPRAR APP</Button>

                    {children}

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
    )
}
