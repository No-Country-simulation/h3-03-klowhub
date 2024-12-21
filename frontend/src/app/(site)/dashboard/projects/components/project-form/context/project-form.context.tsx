"use client"

import { useParams } from "next/navigation";
import { useEffect, useCallback, useReducer, createContext, ReactNode, Dispatch } from "react"

import useStore from "@/contexts/store/use-store.hook";
import projectFormReducer, { PROJECT_FORM_INITIAL_STATE } from "./project-form.reducer";
import { ProjectFormActions } from "./project-form.actions";
import { breakProject, groupProject } from "./project-form.acl";
import { setGeneralData, setDetailsData } from "./project-form.actions";

import { BTUser } from "@/types/user.types";
import { ProjectWithFullImgs, ProjectFormData, ValidatedProjectForm } from "@/types/project.types";

type Props = {
  children: ReactNode[]
}

type TProjectCtx = {
  state: ProjectFormData,
  dispatch: Dispatch<ProjectFormActions>
  submitProject: (additionalData?: object) => Promise<string | undefined>
}
export const ProjectCtx = createContext<TProjectCtx>({
  state: PROJECT_FORM_INITIAL_STATE,
  dispatch: () => {},
  submitProject: async () => undefined
})

const ProjectCtxProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(projectFormReducer, PROJECT_FORM_INITIAL_STATE);
  const params = useParams();
  const projectId = params.id;
  const [ user ] = useStore<BTUser>("user");

  const submitProject = useCallback(async () => {
    if (!user) return;

    const formattedData = breakProject(state as ValidatedProjectForm, true);
    const createEndpoint = `${process.env.NEXT_PUBLIC_PROJECTS_URL}/user/${user.id}`;
    const editEndpoint = `${process.env.NEXT_PUBLIC_PROJECTS_URL}/${projectId}`;

    console.log('formattedData: ', formattedData);
    const res = await fetch(projectId ? editEndpoint : createEndpoint, {
      method: projectId ? 'put' : 'post',
      body: JSON.stringify(formattedData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const createdProject: ProjectWithFullImgs = await res.json();
    console.log("created project: ", createdProject);

    return createdProject.id

  }, [state, user, projectId]);

  useEffect(() => {
    (async function () {
      try {
        if (!projectId) return;

        const endpoint = `${process.env.NEXT_PUBLIC_PROJECTS_URL}/${projectId}`;

        const res = await fetch(endpoint);
        const projectData = await res.json();
        console.log('projectData: ', projectData);
        const groupedProject = groupProject(projectData);


        dispatch(setGeneralData(groupedProject.general))
        dispatch(setDetailsData(groupedProject.details))
      } catch (err) {
        console.error("there was an error when trying to get project data: ", err)
      }
    })()
  }, [projectId])

  useEffect(() => { console.log('project form state', state) }, [state])

  return (
    <ProjectCtx.Provider value={{ state, dispatch, submitProject }}>{children}</ProjectCtx.Provider>
  )
};

export default ProjectCtxProvider

