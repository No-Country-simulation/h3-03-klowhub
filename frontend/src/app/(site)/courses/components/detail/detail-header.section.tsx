"use client"

import { FC, useState } from "react";
import Rating from "@/components/rating/rating.component";
import Image from "next/image";
import { CourseDetailHeader } from "@/types/course-detail-props";

import YouTube from 'react-youtube';
import { getYoutubeProps } from "@/utils/youtube.utils";
import { getYoutubeId } from "@/utils/str.utils";

import { useKeenSlider } from "keen-slider/react";


export const CourseHeader: FC<CourseDetailHeader> = ({
    title,
    summarizeDescription,
    rating,
    ratingCount,
    promotionalVideo,
    lessons
}) => {
    // console.log('promotionalVideo: ', promotionalVideo);

    const [currentVideo, setCurrentVideo] = useState<{
        type: "video" | "youtube";
        link: string | null;
    }>({
        type: "video",
        link: promotionalVideo.fileMetadata.url,

    });

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
            <h3 className="font-semibold text-sm">{title}</h3>
            <p className="text-sm text-gray-300">{summarizeDescription}</p>
            {rating && ratingCount &&
                <Rating
                    rating={rating}
                    ratingCount={ratingCount}
                />
            }

            {currentVideo.type === "video" ? (
                <video controls className="rounded-xl">
                    <source
                        src={currentVideo.link}
                        type={`video/${promotionalVideo.fileMetadata.format}`}
                    />
                </video>
            ) : (
                <div className="rounded-xl overflow-hidden">
                    <YouTube className="h-full" {...getYoutubeProps(currentVideo.link!!)} />
                </div>
            )}

            <div className="bg-[#FFFFFF0D] p-3 rounded-lg">
                <h2 className="text-sm font-semibold mb-2">Contenido gratuito</h2>
                <div ref={sliderRef} className="keen-slider flex pr-4 overflow-hidden">
                    <div className="keen-slider__slide flex-shrink-0 w-50 grow-0">
                        <Image
                            src={promotionalVideo.fileMetadata.thumbnailUrl}
                            alt=""
                            width={promotionalVideo.fileMetadata.width}
                            height={promotionalVideo.fileMetadata.height}
                            className="h-40 rounded-xl cursor-pointer object-cover"
                            onClick={() =>
                                setCurrentVideo({ type: "video", link: promotionalVideo.fileMetadata.url })
                            }
                        />
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
