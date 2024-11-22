import { Trash2 } from "lucide-react";
import Image from "next/image";

type Props = {
  src: string
  deleteCb: () => void
}

const UploadedImage = ({ src, deleteCb }: Props) => {
  return (
    <div className="cursor-pointer border border-solid border-primary-300 relative rounded-xl overflow-hidden w-full h-full" onClick={deleteCb}>
      <div className="absolute w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
        <Trash2 size={36} />
      </div>
      <Image src={src} alt="" width={500} height={500} className="max-h-full max-w-full" objectFit="fill" />
    </div>
  )
};

export default UploadedImage
