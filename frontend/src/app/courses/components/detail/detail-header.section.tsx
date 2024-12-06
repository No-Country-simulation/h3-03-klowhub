"use client"

import { FC, useState } from "react";
import Rating from "@/components/rating/rating.component";
import Image from "next/image";
import { CourseDetailHeader } from "@/types/course-detail-props";

import YouTube from 'react-youtube';
import { getYoutubeProps } from "@/utils/youtube.utils";
import { getYoutubeId } from "@/utils/str.utils";


export const CourseHeader: FC<CourseDetailHeader> = ({
    title,
    summarizeDescription,
    rating,
    ratingCount,
    promotionalVideo,
    lessons
}) => {
  console.log('promotionalVideo: ', promotionalVideo);

    const [currentVideo, setCurrentVideo] = useState<{ 
        type: "video" | "youtube"; 
        link: string | null; 
    }>({
        type: "video",
        link: promotionalVideo.fileMetadata.url,

    });

    return (
        <>
            <h3 className="font-semibold text-sm">{title}</h3>
            <p className="text-sm text-gray-300">{summarizeDescription}</p>
      { rating && ratingCount &&
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
                <div className="flex space-x-4 overflow-x-auto">
                    <div className="flex-shrink-0 w-60">
                        <Image
                            src={promotionalVideo.fileMetadata.thumbnailUrl}
                            alt=""
                            width={1920}
                            height={1080}
                            className="rounded-lg w-full h-28 cursor-pointer object-cover"
                            onClick={() =>
                                setCurrentVideo({ type: "video", link: promotionalVideo.fileMetadata.url })
                            }
                        />
                        <p className="text-left text-sm mt-2">Introducción</p>
                    </div>
                    {lessons.map((lesson, idx) => (
                        <div key={`lesson-${idx}`} className="flex-shrink-0 w-60">
                            <Image
                                src={`https://img.youtube.com/vi/${getYoutubeId(lesson.link!!)}/0.jpg`}
                                alt={lesson.title}
                                width={1920}
                                height={1080}
                                className="rounded-lg w-full h-28 cursor-pointer object-cover"
                                onClick={() =>
                                    setCurrentVideo({ type: "youtube", link: lesson.link!! })
                                }
                            />
                            <p className="text-left text-sm mt-2">{lesson.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

};
