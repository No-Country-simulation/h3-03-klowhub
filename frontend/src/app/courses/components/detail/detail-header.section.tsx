import { FC } from "react";
import Rating from "@/components/rating/rating.component";
import Image from "next/image";
import { CourseDetailHeader } from "@/types/course-detail-props";

// interface CourseHeaderProps {
//     details: CourseDetailHeader;
//     title: string
//     summarizeDescription: string
// }

export const CourseHeader: FC<CourseDetailHeader> = ({
    title,
    summarizeDescription,
    rating,
    ratingCount,
    promotionalVideo
}) => {

    console.log(promotionalVideo.url)

    return (
        <>
            <h3 className="font-semibold text-sm">{title}</h3>
            <p className="text-sm text-gray-300">{summarizeDescription}</p>
            <Rating
                rating={rating}
                ratingCount={ratingCount}
            />
            <video controls className="rounded-xl">
                <source 
                    src={promotionalVideo.url} 
                    type={`video/${promotionalVideo.format}`}
                >
                </source>
            </video>
            {/* <Image
                src={coverImg.url}
                alt="Course Image"
                width={600}
                height={300}
                className="rounded-lg"
            /> */}
        </>
    );

};
