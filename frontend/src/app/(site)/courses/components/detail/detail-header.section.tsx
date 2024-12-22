"use client"

import { Pencil } from "lucide-react";
import { FC, useState } from "react";
import { useParams } from "next/navigation";
import Rating from "@/components/rating/rating.component";
import Image from "next/image";
import { CourseDetailHeader } from "@/types/course-detail-props";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

import YouTube from 'react-youtube';
import { getYoutubeProps } from "@/utils/youtube.utils";
import { getYoutubeId } from "@/utils/str.utils";

import { useKeenSlider } from "keen-slider/react";
import useStore from "@/contexts/store/use-store.hook";
import { BTUser } from "@/types/user.types";
import { useSearchParams } from "next/navigation";

type CurrentVideo = {
  type: "native" | "youtube";
  link: string | null;
}

export const CourseHeader: FC<CourseDetailHeader> = ({
    title,
    summarizeDescription,
    rating,
    ratingCount,
    promotionalVideo,
    lessons,
  authorId
}) => {

  const params = useParams();
  const courseId = params.id;
  // console.log('promotionalVideo: ', promotionalVideo);
  // console.log('lessons: ', lessons);

  const searchParams = useSearchParams();
  const formSection = searchParams.get("section");

  const [ user ] = useStore<BTUser>("user");

  console.log('user.id: ', user.id);
  console.log('authorId: ', authorId);

  const [currentVideo, setCurrentVideo] = useState<CurrentVideo | null>( 
    promotionalVideo ? {
      type: "native",
      link: promotionalVideo.fileMetadata.url,
    } : null
  );

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

    const slidesCount = lessons.length + 1;

    return (
        <>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm">{title}</h3>
        { user && user.id === authorId && formSection !== "preview" &&
          <Link 
            href={`/dashboard/courses/form/${courseId}?section=general`}
            className={`${buttonVariants({ variant: "default" })}`}
          >
            <Pencil />
            <span>Editar Curso</span>
          </Link>
        }
      </div>
            <p className="text-sm text-gray-300">{summarizeDescription}</p>
            {rating && ratingCount &&
                <Rating
                    rating={rating}
                    ratingCount={ratingCount}
                />
            }

      {/* <TempError element="mostrador de videos" reason="al editar, el video es un string (json)" /> */}
        {
          currentVideo && (
            currentVideo.type === 'native' ?
              (
              <video controls className="rounded-xl">
                <source
                  src={currentVideo.link!!}
                  type={`video/${promotionalVideo.fileMetadata.format}`}
                />
              </video>
            ) : (
              <div className="rounded-xl overflow-hidden">
                <YouTube className="h-full" {...getYoutubeProps(currentVideo.link!!)} />
              </div>
            )
          )
        }

            <div className="bg-[#FFFFFF0D] p-3 rounded-lg">
                <h2 className="text-sm font-semibold mb-2">Contenido gratuito</h2>
                <div ref={sliderRef} className="keen-slider flex pr-4 overflow-hidden">
                    <div className="keen-slider__slide flex-shrink-0 w-50 grow-0">
            { promotionalVideo &&
              <Image
                src={promotionalVideo.fileMetadata.thumbnailUrl}
                alt=""
                width={promotionalVideo.fileMetadata.width}
                height={promotionalVideo.fileMetadata.height}
                className="h-40 rounded-xl cursor-pointer object-cover"
                onClick={() =>
                  setCurrentVideo({ type: "native", link: promotionalVideo.fileMetadata.url })
                }
              />
            }
                        <p className="text-left text-sm mt-2">Introducción</p>
                    </div>
                    {lessons.map((lesson, idx) => (
                        <div key={`lesson-${idx}`} className="keen-slider__slide flex-shrink-0 w-50">
                            <Image
                                src={`https://img.youtube.com/vi/${getYoutubeId(lesson.link!!)}/0.jpg`}
                                alt={lesson.title}
                                width={1920}
                                height={1080}
                                className="rounded-xl h-40 cursor-pointer object-cover"
                                onClick={() =>
                                    setCurrentVideo({ type: "youtube", link: lesson.link!! })
                                }
                            />
                            <p className="text-left text-sm mt-2">{lesson.title}</p>
                        </div>
                    ))}
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
