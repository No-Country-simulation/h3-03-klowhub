"use client"

import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import { ReactNode, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type Props = {
  children: ReactNode
}

const CreateCourseLayout = ({ children }: Props) => {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  return (
    <main>
      <BreadCrumb />
      <Suspense fallback={<p>Cargando ...</p>}>
        {section !== "preview" &&
          <h1 className="font-bold mt-5 mb-12">Lanza tu curso: Comparte tu conocimiento</h1>
        }
        {children}
      </Suspense>
    </main>
  )
};

export default CreateCourseLayout
