import Image, { ImageProps } from "next/image";

type Props = {
  display: boolean
  header: string
  text: string
} & ImageProps

const FormAdvice = ({ display, header, text, ...otherProps }: Props) => {
  return (
    <div className={`
      ${display ? "flex" : "hidden"}
      flex-col text-center gap-5`
    }>
      <div className="h-64 overflow-hidden">
        <Image className="rounded-t-lg" width={1024} height={1024} { ...otherProps } />
      </div>
      <h3 className="font-bold">{ header }</h3>
      <p>{ text }</p>
    </div>
  )
};

export default FormAdvice
