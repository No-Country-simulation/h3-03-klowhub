import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import { CourseCtx } from "@/app/dashboard/courses/new/context/course-form.context";

import { FDAdapter } from "@/app/dashboard/courses/new/context/course-form.utils";
import { modulesAdapter, lessonsAdapter, TEMPMockedResponse } from "@/app/api/courses/[id]/route";

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
        const previewData = FDAdapter(courseContext.state)
        const transformedProgram = modulesAdapter(previewData);
        const freeLessons = lessonsAdapter(previewData);
        setPageData({ courseData: previewData, transformedProgram, freeLessons })

      } else if (mockedData) {
        // backend sends data case
        console.log('getting data from sessionStorage...');
        const parsedMockedData = JSON.parse(mockedData);
        const transformedProgram = modulesAdapter(parsedMockedData);
        const freeLessons = lessonsAdapter(parsedMockedData);
        setPageData({ courseData: parsedMockedData, transformedProgram, freeLessons })

      } else {
        // TEMPORARY mock case
        console.log('getting data from internal api...');
        const res = await fetch(`/api/courses/${params.id}`);
        const data: TEMPMockedResponse = await res.json();
        setPageData(data)
      };
    })()
  }, [courseContext, params.id])

  return { pageData, submitCourse: courseContext?.submitCourse }
};
