import { ReactNode } from "react";

type Props = {
  active: boolean
  children: ReactNode
}

const Tab = ({ children, active }: Props) => {
  return (
    <span 
      className={`
        inline-block border-b-2 border-solid px-4 pb-2 font-bold text-sm
        ${active ? "text-primary-300 border-primary-300" : "border-white"}`
      }
    >
      { children }
    </span>
  )
};

export default Tab
