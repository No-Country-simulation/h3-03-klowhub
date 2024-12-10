"use client"

import { createContext, ReactNode, Dispatch } from "react"
import { ProjectFormData } from "@/types/project.types";
import { useReducer } from "react";
import projectFormReducer, { PROJECT_FORM_INITIAL_STATE } from "./project-form.reducer";
import { ProjectFormActions } from "./project-form.actions";
import { useCallback } from "react";
import { useEffect } from "react";
import { breakProject } from "./project-form.acl";

type Props = {
  children: ReactNode[]
}

type TProjectCtx = {
  state: ProjectFormData,
  dispatch: Dispatch<ProjectFormActions>
  submitProject: () => Promise<string>
}
export const ProjectCtx = createContext<TProjectCtx | undefined>(undefined)

const ProjectCtxProvider = ({ children }: Props) => {
  const [ state, dispatch ] = useReducer(projectFormReducer, PROJECT_FORM_INITIAL_STATE);

  const submitProject = useCallback(async (additionalData = {}) => {
    const userId = "550e8400-e29b-41d4-a716-446655440000"; // TODO: this should be taken from the global state
    const formattedData = breakProject({...state, ...additionalData, userId});
    console.log('creating course...', formattedData);

    // const res = await fetch('http://localhost:3003/courses/createCourse', { 
    //   method: 'post',
    //   body: JSON.stringify(formattedData),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // });   
    //
    // const createdCourse: Course = await res.json();
    // console.log('createdCourse: ', createdCourse);
    //
    // return createdCourse.id

    const temporaryId = "course-19u3-124-asdad";
    window.sessionStorage.setItem("courseForm", JSON.stringify(formattedData))
    console.log(window.sessionStorage.getItem("courseForm"));
    return temporaryId

  }, [state]);

  useEffect(() => { console.log('project form state', state) }, [ state ])

  return (
    <ProjectCtx.Provider value={{ state, dispatch, submitProject }}>{ children }</ProjectCtx.Provider>
  )
};

export default ProjectCtxProvider

