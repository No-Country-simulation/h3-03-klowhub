import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import { ReactNode } from "react";
import FormPageHeader from "@/components/form-page-header/form-page-header.component";
import { Suspense } from "react";

type Props = {
  children: ReactNode
}

const CreateProjectLayout = ({ children }: Props) => {
  return (
    <main className="flex flex-col gap-5">
      <BreadCrumb />
      <Suspense>
        <FormPageHeader>Publica tu proyecto</FormPageHeader>
      </Suspense>
      { children }
    </main>
  )
};

export default CreateProjectLayout

