import { ReactNode } from "react";

type Props = {
  header: string
  children: ReactNode
  orientation?: "vertical" | "horizontal"
  containerStyles?: string
}

const FilterDisplayer = ({ header, children, containerStyles, orientation = "vertical" }: Props) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <h3 className="flex items-center text-center text-sm font-semibold text-[#FFFFFF] h-10">{ header }</h3>
      <div className={`flex flex-${orientation === "vertical" ? "col" : "row"} items-center justify-center gap-2 ${containerStyles}`}>
        { children }
      </div>
    </div>
  )
};

export default FilterDisplayer
