import { FC, useState } from "react";
import { AppDetailHeader } from "./app-detail.types";
import Rating from "@/components/rating/rating.component";
import Image from "next/image";
import { Clock } from "lucide-react";
import { TDocument, TImage, TVideo } from "@/types/global.types";
import { useKeenSlider } from "keen-slider/react";

export const AppHeader: FC<AppDetailHeader> = ({
  title,
  shortDescription,
  rating,
  ratingCount,
  coverImg,
  assets
}) => {
  const [currentAsset, setCurrentAsset] = useState<TImage | TVideo | TDocument>(coverImg);

  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 3,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 640px)": {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  const slidesCount = assets.length + 1;

  return (
    <>
      <h3 className="font-semibold text-sm">{title}</h3>
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5" />
        <span className="text-xs">Ultima actualización: 12/06/2024</span>
      </div>
      <p className="text-sm text-gray-300">{shortDescription}</p>
      {rating && ratingCount &&
        <Rating
          rating={rating ?? 0}
          ratingCount={ratingCount}
        />
      }
      <div className="rounded-lg aspect-video cursor-pointer flex flex-col justify-center">
        {currentAsset?.fileType === "video" &&
          <video controls className="rounded-xl">
            <source
              src={currentAsset.fileMetadata.url}
              type={currentAsset.fileMetadata.mimeType}
            />
          </video>
        }
        {currentAsset?.fileType === "image" &&
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
        <div ref={sliderRef} className="keen-slider flex pr-4 overflow-hidden">
          <div className="keen-slider__slide flex-shrink-0 w-50 grow-0">
            <Image
              src={coverImg.fileMetadata.url}
              width={coverImg.fileMetadata.width}
              height={coverImg.fileMetadata.height}
              alt=""
              onClick={() =>
                setCurrentAsset(coverImg)
              }
              className="rounded-xl overflow-hidden h-40 object-cover cursor-pointer"
            />
          </div>
          {
            assets.map((ast, idx) => (
              <div className="keen-slider__slide w-50 flex-shrink-0" key={`asset-${idx}`}>
                <>
                  {["image", "video"].includes(ast.fileType) ? (
                    <Image
                       // @ts-expect-error: Unreachable code error
                      src={ast.fileType === "image" ? ast.fileMetadata.url : ast.fileMetadata.thumbnailUrl}
                      width={(ast as TImage).fileMetadata.width}
                      height={(ast as TImage).fileMetadata.height}
                      alt=""
                      onClick={() =>
                        setCurrentAsset(ast)
                      }
                      className="cursor-pointer rounded-xl object-cover h-40"
                    />
                  ) : <div>is a pdf</div>
                  }
                </>
              </div>

            ))
          }

        </div>
        <div className="flex justify-center mt-4">
          {[...Array(slidesCount)].map((_, idx) => (
            <button
              key={`dot-${idx}`}
              onClick={() => slider.current?.moveToIdx(idx)}
              className={`w-2 h-2 mx-1 rounded-full ${currentSlide === idx ? "bg-blue-500" : "bg-gray-400"
                }`}
            />
          ))}
        </div>
      </div>
    </>
  );

};
