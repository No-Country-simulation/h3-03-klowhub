"use client"

import { OwnedCourses } from "./owned-courses.component";
import useStore from "@/contexts/store/use-store.hook";
import { User } from "@/contexts/store/store.types";
import { useEffect, useState } from "react";
import { TProductCard } from "@/components/product-card/product-card.types";
import { CourseWithFullAssets } from "@/types/courses.types";
import { transformCourse } from "./owned-course.acl";


const OwnCoursesWrapper = () => {
  const [ user ] = useStore<User>("user");
  const [ ownCourses, setOwnCourses ] = useState<TProductCard[]>([])

  useEffect(() => {
    const endpoint = `${process.env.NEXT_PUBLIC_COURSES_URL}/${user.id}`;
    (async function () {
      const res = await fetch(endpoint);
      const courses: CourseWithFullAssets[] = await res.json() || [];

      const transformedCourses = courses.map(c => transformCourse(c));

      setOwnCourses(transformedCourses)
    })()
  }, [user.id])

  return (
    <div>
        {ownCourses.map((course, index) => (
            <OwnedCourses data={course} key={index} />
        ))}
    </div>
  )
};

export default OwnCoursesWrapper
