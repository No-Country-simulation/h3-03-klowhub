import { ReactNode } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { getPathname } from "@/utils/route.utils";
import Overlay from "../overlay/overlay.component";

type FilterModalProps = {
  children: ReactNode | ReactNode[]
  background?: string
}

const SideModal = async ({ children, background }: FilterModalProps) => {
  const pathname = await getPathname();

  return (
    <>
      <Link href={`${pathname}`} scroll={false}>
        <Overlay />
      </Link>

      <div className={`
        w-full ${background || "bg-kPurple"} py-6 px-3 top-0 right-0 fixed h-dvh z-[99999] text-white flex flex-col items-end gap-5
        sm:w-auto 
      `}>
        <Link href={`${pathname}`} className="mr-5"  scroll={false}>
          <X />
        </Link>
        { children }
      </div>
    </> 
  )
};

export default SideModal
