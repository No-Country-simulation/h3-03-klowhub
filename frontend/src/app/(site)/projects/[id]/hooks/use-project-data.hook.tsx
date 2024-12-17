import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import { ProjectCtx } from "@/app/(site)/dashboard/projects/components/project-form/context/project-form.context";

import { breakProject } from "@/app/(site)/dashboard/projects/components/project-form/context/project-form.acl";
import { Project } from "@/types/project.types";

const useProjectData = () => {
  const [ pageData, setPageData ] = useState<Project>();
  const projectContext = useContext(ProjectCtx);
  const params = useParams();

  useEffect(() => {
    (async function () {
      if (projectContext) {
        console.log('getting data from course context...');
        const previewData = breakProject(projectContext.state)
        setPageData(previewData!!)

      } else {
        console.log('getting data from api...');
        const res = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_URL}/${params.id}?withAuthor=true&withReviews=true`);
        const data: Project = await res.json();
        setPageData(data)
      };
    })()
  }, [projectContext, params.id])

  return { pageData, submitProject: projectContext?.submitProject }
};

export default useProjectData
