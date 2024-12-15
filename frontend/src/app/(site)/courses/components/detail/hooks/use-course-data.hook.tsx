import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import { CourseCtx } from "@/app/(site)/dashboard/courses/components/course-form/context/course-form.context";

import { breakCourse } from "@/app/(site)/dashboard/courses/components/course-form/context/course-form.acl";
import { TEMPMockedResponse } from "@/app/api/courses/[id]/route";
import { modulesAdapter, lessonsAdapter } from "@/app/api/courses/[id]/utils";

export const useCourseData = () => {
  const [ pageData, setPageData ] = useState<TEMPMockedResponse>();
  const courseContext = useContext(CourseCtx);
  const params = useParams();

  useEffect(() => {
    (async function () {
      if (courseContext) {
        console.log('getting data from course context...');
        const previewData = breakCourse(courseContext.state)
        const transformedProgram = modulesAdapter(previewData);
        const freeLessons = lessonsAdapter(previewData);
        setPageData({ courseData: previewData, transformedProgram, freeLessons })

      } else {
        console.log('getting data from internal api...');
        const res = await fetch(`/api/courses/${params.id}?withAuthor=true&withReviews=true`);
        const data: TEMPMockedResponse = await res.json();
        setPageData(data)
      };
    })()
  }, [courseContext, params.id])

  return { pageData, submitCourse: courseContext?.submitCourse }
};
