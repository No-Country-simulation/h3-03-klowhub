"use client"

import { useContext } from "react";
import { ProjectCtx } from "../context/project-form.context";

const useProjectContext = () => {
  const projectContext = useContext(ProjectCtx);
  if (!projectContext) throw new Error("no context found");
  const { state, dispatch } = projectContext

  return { state, dispatch }
};

export default useProjectContext

