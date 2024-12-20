"use client"

import { OwnedCourses } from "./owned-courses.component";
import useStore from "@/contexts/store/use-store.hook";
import { BTUser } from "@/types/user.types";
import { useEffect, useState } from "react";
import { TProductCard } from "@/components/product-card/product-card.types";
import { CourseWithFullAssets } from "@/types/courses.types";
import { transformCourse } from "./owned-course.acl";


const OwnCoursesWrapper = () => {
  const [ user, _, isLoading ] = useStore<BTUser>("user");
  const [ ownCourses, setOwnCourses ] = useState<TProductCard[]>([])

  useEffect(() => {
    if (isLoading) return;
    const endpoint = `${process.env.NEXT_PUBLIC_COURSES_URL}/user/${user.id}`;
    (async function () {
      const res = await fetch(endpoint);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message)
      };

      const courses: CourseWithFullAssets[] = await res.json() || [];
      const transformedCourses = courses.map(c => transformCourse(c));

      setOwnCourses(transformedCourses)
    })()
  }, [user, isLoading])

  return (
    <div>
        {ownCourses.map((course, index) => (
            <OwnedCourses data={course} key={index} />
        ))}
    </div>
  )
};

export default OwnCoursesWrapper
