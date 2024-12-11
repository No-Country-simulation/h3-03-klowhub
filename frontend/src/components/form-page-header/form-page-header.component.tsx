"use client"

import { ReactNode } from "react";
import { useSearchParams } from "next/navigation";

const FormPageHeader = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  return section !== "preview" ? (
    <h1 className="font-bold mt-5 mb-12">{ children }</h1>
  ) : ""
};


export default FormPageHeader
