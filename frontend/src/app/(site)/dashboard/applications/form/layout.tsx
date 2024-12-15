import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import { ReactNode } from "react";
import FormPageHeader from "@/components/form-page-header/form-page-header.component";
import { Suspense } from "react";

type Props = {
  children: ReactNode
}

const CreateCourseLayout = ({ children }: Props) => {
  return (
    <main>
      <BreadCrumb />
      <Suspense>
        <FormPageHeader>Lanza tu curso: Comparte tu conocimiento</FormPageHeader>
      </Suspense>
      { children }
    </main>
  )
};

export default CreateCourseLayout
