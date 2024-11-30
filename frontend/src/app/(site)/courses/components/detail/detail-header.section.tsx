import { FC } from "react";
import Rating from "@/components/rating/rating.component";
import Image from "next/image";
import { CourseDetailHeader } from "@/types/course-detail-props";

interface CourseHeaderProps {
    details: CourseDetailHeader;
}

export const CourseHeader: FC<CourseHeaderProps> = ({ details }) => {

    return (
        <>
            <h3 className="font-semibold text-sm">{details.title}
            </h3>
            <p className="text-sm text-gray-300">{details.description}</p>
            <Rating
                rating={details.rating}
                ratingCount={details.ratingCount}
            />
            <Image
                src={details.image}
                alt="Course Image"
                width={600}
                height={300}
                className="rounded-lg w-full h-96"
            />
        </>
    );

};
