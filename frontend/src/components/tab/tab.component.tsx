import Link from "next/link";
import { getPathname, getQueryParams } from "@/utils/route.utils";
import { ReactNode } from "react";

type Props = {
  section: string
  children: ReactNode
}

const Tab = async ({ children, section }: Props) => {
  const pathname = await getPathname();
  const queryParams = await getQueryParams();

  return (
    <Link 
      href={`${pathname}?section=${section}`}
      className={`
        inline-block border-b-2 border-solid px-4 pb-2 font-bold text-sm
        ${queryParams.section === section ? "text-primary-300 border-primary-300" : "border-white"}`
      }
    >
      { children }
    </Link>
  )
};

export default Tab
