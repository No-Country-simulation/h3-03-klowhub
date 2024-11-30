import { ReactNode } from "react";
import Overlay from "../overlay/overlay.component";
import Icon from "../icon/icon.component";

type Props = {
  header: string
  message: string
  children: ReactNode[]
}

const Greeter = ({ header, message, children }: Props) => {
  return (
    <>
      <Overlay />
      <div className="fixed w-full h-screen top-0 left-0 z-[99999] flex justify-center items-center px-5 md:px-10">
        <div className="py-10 px-5 md:px-16 bg-card flex flex-col gap-5 rounded-xl w-full md:w-[500px]">
          <h2 className="font-bold text-center">{ header }</h2>
          <p className="text-center">{ message }</p>
          <div className="mx-auto"><Icon name="greeter-check" /></div>
          <div className="mx-auto flex flex-col gap-5">{ children }</div>
        </div>
      </div>
    </>
  )   
};

export default Greeter
