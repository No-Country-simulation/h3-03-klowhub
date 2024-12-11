"use client"

import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import { ReactNode, Suspense } from "react";
import FormPageHeader from "@/components/form-page-header/form-page-header.component";

type Props = {
  children: ReactNode
}

const CreateCourseLayout = ({ children }: Props) => {
  return (
    <main>
      <BreadCrumb />
      <Suspense fallback={<p>Cargando ...</p>}>
        <FormPageHeader>Lanza tu curso: Comparte tu conocimiento</FormPageHeader>
        {children}
      </Suspense>
    </main>
  )
};


export default CreateCourseLayout
