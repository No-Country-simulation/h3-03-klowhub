import { TVideo } from "@/types/global.types";
import { Trash2 } from "lucide-react";

type Props = {
  video: TVideo
  deleteCb?: () => void
}

const UploadedVideo = ({ video, deleteCb }: Props) => {
  const { width, height, url } = video;
  return (
    <div className="cursor-pointer border border-solid border-primary-300 relative rounded-xl overflow-hidden w-full h-full" onClick={deleteCb}>
      { deleteCb &&
        <div className="absolute top-0 right-0 border border-1 border-red-600 rounded-full p-2 mr-2 mt-2 bg-red-800/70">
          <Trash2 size={20}/>
        </div>
      }
      <video width={width} height={height} controls>
        <source src={url} type="video/mp4"></source>
      </video>
    </div>
  )
};

export default UploadedVideo
