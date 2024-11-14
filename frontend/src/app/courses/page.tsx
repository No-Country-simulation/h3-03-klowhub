import { BreadCrumb } from "@/components/courses/BreadCrumb";
import { SearchFilter } from "@/components/courses/SearchFilter";
import CourseCard from "@/components/courses/CourseCard";
import { courses } from "@/mocks/products.mocks";

import { CoursesPagination } from "@/components/courses/CoursesPagination";

const Page = () => {

    return (
        <div>
            <div className="container px-6 md:px-0 mx-auto">
                <BreadCrumb />
            </div>

            <SearchFilter />

            <div className="container mx-auto">
                {courses.map((course, index) => (
                    <CourseCard
                        title={course.title}
                        img={course.img}
                        description={course.description}
                        platform={course.platform}
                        tags={course.tags}
                        rating={course.rating}
                        ratingCount={course.ratingCount}
                        price={course.price}
                        key={index}
                    />
                ))}
            </div>

            <div className="container mx-auto flex items-center justify-center mb-8">
                <CoursesPagination/>
            </div>
        </div>
    );

};

export default Page;