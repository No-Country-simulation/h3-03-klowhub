import { Dispatch, SetStateAction } from "react";
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";

export type Action = "prev" | "next" | "submit" | "preview"

export const dispatcher = <CF, LF extends FieldValues>(
  handleSubmit: UseFormHandleSubmit<LF, undefined>,
  action: Action,
  keyToUpdate: keyof CF,
  contextSetter: Dispatch<SetStateAction<CF>> | undefined,
  // routeChanger: ((direction: "prev" | "next") => void) | undefined,
  isDirty?: boolean,
) => {
  if (!contextSetter) return;

  if (isDirty) {
    handleSubmit(data => {
      contextSetter(prev => ({ ...prev, [keyToUpdate]: data }))
    })
  };

  return action

  // if (action === "next" || action === "prev") {
  //   if (!routeChanger) return
  //   routeChanger(action)
  // };

};
