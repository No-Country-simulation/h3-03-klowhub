"use client"

import { useParams } from "next/navigation";
import { useEffect, useCallback, useReducer, createContext, ReactNode, Dispatch } from "react"


import useStore from "@/contexts/store/use-store.hook";
import projectFormReducer, { PROJECT_FORM_INITIAL_STATE } from "./project-form.reducer";
import { ProjectFormActions } from "./project-form.actions";
import { breakProject, groupProject } from "./project-form.acl";
import { setGeneralData, setDetailsData } from "./project-form.actions";

import { User } from "@/contexts/store/store.types";
import { Project, ProjectFormData } from "@/types/project.types";

type Props = {
  children: ReactNode[]
}

type TProjectCtx = {
  state: ProjectFormData,
  dispatch: Dispatch<ProjectFormActions>
  submitProject: (additionalData?: object) => Promise<string | undefined>
}
export const ProjectCtx = createContext<TProjectCtx | undefined>(undefined)

const ProjectCtxProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(projectFormReducer, PROJECT_FORM_INITIAL_STATE);
  const params = useParams();
  const projectId = params.id;
  const [ user ] = useStore<User>("user");

  const submitProject = useCallback(async (additionalData = {}) => {
    const formattedData = breakProject({ ...state, ...additionalData });
    console.log('creating project...', formattedData);

    const res = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_URL}/${user.id}${projectId ? "/" + projectId : ""}`, {
      method: 'post',
      body: JSON.stringify(formattedData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const createdProject: Project = await res.json();
    console.log("created project: ", createdProject);

    return createdProject.id

  }, [state, user.id, projectId]);

  useEffect(() => {
    (async function () {
      try {
        if (!projectId) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_COURSES_URL}/${projectId}`);
        const projectData = await res.json();
        const groupedProject = groupProject(projectData);
        console.log('groupProject: ', groupProject);

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

