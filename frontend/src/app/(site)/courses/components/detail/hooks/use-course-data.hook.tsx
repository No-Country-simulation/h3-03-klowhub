import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import { CourseCtx } from "@/app/(site)/dashboard/courses/new/context/course-form.context";

import { breakCourse } from "@/app/(site)/dashboard/courses/new/context/course-form.acl";
import { TEMPMockedResponse } from "@/app/api/courses/[id]/route";
import { modulesAdapter, lessonsAdapter } from "@/app/api/courses/[id]/utils";

export const useCourseData = () => {
  const [ pageData, setPageData ] = useState<TEMPMockedResponse>();
  const courseContext = useContext(CourseCtx);
  const params = useParams();

  useEffect(() => {
    (async function () {
      const mockedData = window.sessionStorage.getItem("courseForm"); // TODO: this should be the object retrieved from the api

      if (courseContext) {
        // preview case
        console.log('getting data from course context...');
        const previewData = breakCourse(courseContext.state)
        const transformedProgram = modulesAdapter(previewData);
        const freeLessons = lessonsAdapter(previewData);
        setPageData({ courseData: previewData, transformedProgram, freeLessons })

      } else if (mockedData) {
        // delete this case after integrating with api
        // backend sends data case
        console.log('getting data from sessionStorage...');
        const parsedMockedData = JSON.parse(mockedData);
        const transformedProgram = modulesAdapter(parsedMockedData);
        const freeLessons = lessonsAdapter(parsedMockedData);
        setPageData({ courseData: parsedMockedData, transformedProgram, freeLessons })

      } else {
        // api integration goes here
        console.log('getting data from internal api...');
        const res = await fetch(`/api/courses/${params.id}?withAuthor=true&withReviews=true`);
        const data: TEMPMockedResponse = await res.json();
        setPageData(data)
      };
    })()
  }, [courseContext, params.id])

  return { pageData, submitCourse: courseContext?.submitCourse }
};
