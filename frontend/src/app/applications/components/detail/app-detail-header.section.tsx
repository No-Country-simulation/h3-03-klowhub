import { FC, useState } from "react";
import { AppDetailHeader } from "./app-detail.types";
import Rating from "@/components/rating/rating.component";
import Image from "next/image";
import { Clock } from "lucide-react";
import { TDocument, TImage, TVideo } from "@/types/global.types";

export const AppHeader: FC<AppDetailHeader> = ({
    title,
    shortDescription,
    rating,
    ratingCount,
    coverImg,
  assets
}) => {
    const [currentAsset, setCurrentAsset] = useState<TImage | TVideo | TDocument>(coverImg);

    return (
        <>
            <h3 className="font-semibold text-sm">{title}</h3>
            <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span className="text-xs">Ultima actualización: 12/06/2024</span>
            </div>
            <p className="text-sm text-gray-300">{shortDescription}</p>
      { rating && ratingCount &&
        <Rating
          rating={rating ?? 0}
          ratingCount={ratingCount}
        />
      }
      <div className="rounded-lg aspect-video cursor-pointer flex flex-col justify-center">
        { currentAsset?.fileType === "video" &&
          <video controls className="rounded-xl">
            <source
              src={currentAsset.fileMetadata.url}
              type={currentAsset.fileMetadata.mimeType}
            />
          </video>
        }
        { currentAsset?.fileType === "image" &&
          <Image 
            src={currentAsset.fileMetadata.url}
            width={(currentAsset as TImage).fileMetadata.width} 
            height={(currentAsset as TImage).fileMetadata.height} 
            alt=""
              className="rounded-xl overflow-hidden"
          />
        }
      </div>


      <div className="bg-[#FFFFFF0D] p-3 rounded-lg">
        <h2 className="text-sm font-semibold mb-2">Vista Previa</h2>
        <div className="flex space-x-4 overflow-x-auto">
          <div className="flex-shrink-0 w-60 cursor-pointer h-40">
            <Image 
              src={coverImg.fileMetadata.url}
              width={coverImg.fileMetadata.width} 
              height={coverImg.fileMetadata.height} 
              alt=""
              onClick={() =>
                setCurrentAsset(coverImg)
              }
              className="rounded-xl overflow-hidden object-cover"
            />
          </div>
          {
            assets.map((ast, idx) => (
              <div className="flex-shrink-0 w-60 h-40" key={`asset-${idx}`}>
                <>
                  { ["image", "video"].includes(ast.fileType) ? (
                    <div className="rounded-xl overflow-hidden" >
                      <Image 
                        src={ast.fileType === "image" ? ast.fileMetadata.url : ast.fileMetadata.thumbnailUrl}
                        width={(ast as TImage).fileMetadata.width} 
                        height={(ast as TImage).fileMetadata.height} 
                        alt=""
                        onClick={() =>
                          setCurrentAsset(ast)
                        }
                        className="cursor-pointer"
                      />

                    </div>
                  ) : <div>is a pdf</div>
                  }
                </> 
              </div>

            ))
          }

        </div>
      </div>

            
        </>
    );

};
