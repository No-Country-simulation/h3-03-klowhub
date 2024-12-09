import { ReactNode } from "react";

type Props = {
  header: string
  children: ReactNode
}

const FilterDisplayer = ({ header, children }: Props) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <h3 className="flex items-center text-center text-sm font-semibold text-[#FFFFFF] h-10">{ header }</h3>
      <div className="flex flex-col items-center justify-center gap-2">
        { children }
      </div>
    </div>
  )
};

export default FilterDisplayer
