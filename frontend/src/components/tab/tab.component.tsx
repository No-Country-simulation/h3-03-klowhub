import { getQueryParams } from "@/utils/route.utils";
import { ReactNode } from "react";

type Props = {
  section: string
  children: ReactNode
}

const Tab = async ({ children, section }: Props) => {
  const queryParams = await getQueryParams();

  return (
    <span 
      className={`
        inline-block border-b-2 border-solid px-4 pb-2 font-bold text-sm
        ${queryParams.section === section ? "text-primary-300 border-primary-300" : "border-white"}`
      }
    >
      { children }
    </span>
  )
};

export default Tab
