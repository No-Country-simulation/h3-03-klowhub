import { TVideo } from "@/types/global.types";
import { Trash2 } from "lucide-react";

type Props = {
  video: TVideo
  deleteCb?: () => void
}

const UploadedVideo = ({ video, deleteCb }: Props) => {
  console.log('video: ', video);
  const { width, height, url } = video;
  return (
    <div className="asset-container" onClick={deleteCb}>
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
