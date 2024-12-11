import { Trash2 } from "lucide-react";
import Image from "next/image";

type Props = {
  src: string
  deleteCb: () => void
  readOnly?: boolean
}

const UploadedImage = ({ src, deleteCb, readOnly }: Props) => {
  return (
    <div className="asset-container" onClick={readOnly ? undefined : deleteCb}>
      { !readOnly &&
        <div className="absolute w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
          <Trash2 size={36} />
        </div>
      }
      <Image src={src} alt="" width={500} height={350} className="max-h-full max-w-full" objectFit="fill" />
    </div>
  )
};

export default UploadedImage
