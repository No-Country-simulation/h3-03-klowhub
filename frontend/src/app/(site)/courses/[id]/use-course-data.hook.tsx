import { CourseWithFullAssets } from "@/types/courses.types";
import { CourseFormData } from "@/types/courses.types";
import { useState, useEffect } from "react";
import { usePathname, useParams } from "next/navigation";
import useIsClientCtx from "@/contexts/is-client/use-is-client.hook";
import { breakCourse } from "../../dashboard/courses/components/course-form/context/course-form.acl";
import useStore from "@/contexts/store/use-store.hook";
import { BTUser } from "@/types/user.types";

type Sources = {
  serverSideData?: CourseWithFullAssets
  clientSideData?: CourseFormData
}

const useCourseData = ({ serverSideData, clientSideData }: Sources) => {
  const isClientCtx = useIsClientCtx();
  const [ courseData, setCourseData ] = useState<CourseWithFullAssets>()
  const [ user ] = useStore<BTUser>("user");

  const pathname = usePathname();
  const params = useParams();

  const courseId = params.id;

  useEffect(() => {
    if (pathname.includes("/dashboard/courses/form") && clientSideData && isClientCtx) {
      setCourseData({...breakCourse(clientSideData, false), author: user})
    };

    if (pathname === `/courses/${courseId}`) {
      setCourseData(serverSideData)
    };
  }, [courseId, clientSideData, isClientCtx, pathname, serverSideData, user])

  return courseData
};

export default useCourseData
