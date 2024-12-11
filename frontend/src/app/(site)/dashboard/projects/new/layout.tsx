import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import { ReactNode } from "react";

type Props = {
  children: ReactNode
}

const CreateProjectLayout = ({ children }: Props) => {
  return (
    <main>
      <BreadCrumb />
      <h1 className="font-bold mt-5 mb-12">Publica tu proyecto</h1>
      { children }
    </main>
  )
};

export default CreateProjectLayout

