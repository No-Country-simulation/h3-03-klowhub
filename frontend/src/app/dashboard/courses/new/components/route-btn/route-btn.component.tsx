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
}

const RouteBtn = ({ route, setter, children, isDirty }: Props) => {
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
      className="right-0 px-14 self-end bg-primary-500 py-2 rounded-md" 
      onClick={clickHandler}
    >
      { children }
    </button>
  )
};

export default RouteBtn
