import { ReactNode } from "react";

type Props = {
  children: ReactNode
}

const TempError = ({ children }: Props) => {
  return (
    <div className="bg-red-600 text-white">{ children }</div>
  )   
};

export default TempError
