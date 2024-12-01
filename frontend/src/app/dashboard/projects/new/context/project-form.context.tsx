"use client"

import { createContext, ReactNode, Dispatch } from "react"
import { ProjectFormData } from "@/types/project.types";
import { useReducer } from "react";
import projectFormReducer, { PROJECT_FORM_INITIAL_STATE } from "./project-form.reducer";
import { ProjectFormActions } from "./project-form.actions";
import { useEffect } from "react";

type Props = {
  children: ReactNode[]
}

type TProjectCtx = {
  state: ProjectFormData,
  dispatch: Dispatch<ProjectFormActions>
}
export const ProjectCtx = createContext<TProjectCtx | undefined>(undefined)

const ProjectCtxProvider = ({ children }: Props) => {
  const [ state, dispatch ] = useReducer(projectFormReducer, PROJECT_FORM_INITIAL_STATE);

  useEffect(() => { console.log('project form state', state) }, [ state ])

  return (
    <ProjectCtx.Provider value={{ state, dispatch }}>{ children }</ProjectCtx.Provider>
  )
};

export default ProjectCtxProvider

