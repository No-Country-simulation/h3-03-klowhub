"use client"

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type Props = {
  route: string
  isDirty?: boolean
  children: ReactNode
  setter?: (e?: React.BaseSyntheticEvent) => Promise<void>, 
  className?: string
  variant?: "outline"
}

const RouteBtn = ({ route, setter, children, isDirty, className, variant }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const clickHandler = useCallback(() => {
    if (isDirty) {
      if (setter) setter();
    };
    router.replace(`${pathname}?section=${route}`)
  }, [isDirty, router, route, pathname, setter]);

  return (
    <button 
      type="button"
      className={`
        right-0 px-2 self-end py-2 text-primary-100 md:px-14 rounded-md ease-in duration-100 ${className}
         
        ${variant === "outline" 
          ? "bg-none bg-transparent outline outline-[1px] outline-primary-200 hover:bg-primary-600"
          : "bg-primary-500 hover:bg-secondary-400"}
      `} 
      onClick={clickHandler}
    >
      { children }
    </button>
  )
};

export default RouteBtn
