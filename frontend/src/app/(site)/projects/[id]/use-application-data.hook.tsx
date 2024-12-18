import { ProjectWithFullImgs, ProjectFormData, ValidatedProjectForm } from "@/types/project.types";
import { useState, useEffect } from "react";
import { usePathname, useParams } from "next/navigation";
import useIsClientCtx from "@/contexts/is-client/use-is-client.hook";
import { breakProject } from "../../dashboard/projects/components/project-form/context/project-form.acl";
import useStore from "@/contexts/store/use-store.hook";
import { BTUser } from "@/types/user.types";

type Sources = {
  serverSideData?: ProjectWithFullImgs
  clientSideData?: ProjectFormData
}

const useProjectData = ({ serverSideData, clientSideData }: Sources) => {
  const isClientCtx = useIsClientCtx();
  const [ projectData, setProjectData ] = useState<ProjectWithFullImgs>()
  const [ user ] = useStore<BTUser>("user");

  const pathname = usePathname();
  const params = useParams();

  const projectId = params.id;

  useEffect(() => {
    if (pathname.includes("/dashboard/projects/form") && clientSideData && isClientCtx) {
      setProjectData({...breakProject(clientSideData as ValidatedProjectForm, false), author: user})
    };

    if (pathname === `/projects/${projectId}`) {
      setProjectData(serverSideData)
    };
  }, [projectId, clientSideData, isClientCtx, pathname, serverSideData, user])

  return projectData
};

export default useProjectData
