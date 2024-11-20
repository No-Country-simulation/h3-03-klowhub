import Image, { ImageProps } from "next/image";
import { ReactNode } from "react";

type Props = {
  children: ReactNode
} & ImageProps

const FormAdvice = ({ children, ...otherProps }: Props) => {
  return (
    <div className="flex flex-col text-center">
      <Image { ...otherProps } />
      { children }
    </div>
  )
};

export default FormAdvice
