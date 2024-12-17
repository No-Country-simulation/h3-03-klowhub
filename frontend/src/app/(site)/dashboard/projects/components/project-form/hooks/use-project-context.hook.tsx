"use client"

import { useContext } from "react";
import { ProjectCtx } from "../context/project-form.context";

const useProjectContext = () => {
  const projectContext = useContext(ProjectCtx);
  if (!projectContext) return { state: undefined, dispatch: undefined, submitProject: undefined }

  const { state, dispatch, submitProject } = projectContext

  return { state, dispatch, submitProject }
};

export default useProjectContext

