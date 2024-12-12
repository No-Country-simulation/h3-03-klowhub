import { ReactNode } from "react";

type Props = {
  children: ReactNode
}

const TempError = ({ children }: Props) => {
  return (
    <span className="bg-red-600 text-white">{ children }</span>
  )   
};

export default TempError
