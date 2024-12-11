import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import { ReactNode } from "react";

type Props = {
  children: ReactNode
}

const CreateCourseLayout = ({ children }: Props) => {
  return (
    <main>
      <BreadCrumb />
      <h1 className="font-bold mt-5 mb-12">Lanza tu curso: Comparte tu conocimiento</h1>
      { children }
    </main>
  )
};

export default CreateCourseLayout
