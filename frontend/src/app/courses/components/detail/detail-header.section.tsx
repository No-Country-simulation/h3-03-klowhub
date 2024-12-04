import { FC } from "react";
import Rating from "@/components/rating/rating.component";
import Image from "next/image";
import { CourseDetailHeader } from "@/types/course-detail-props";

import YouTube, { YouTubeProps } from 'react-youtube';
import { getYoutubeId } from "@/utils/str.utils";


// interface CourseHeaderProps {
//     details: CourseDetailHeader;
//     title: string
//     summarizeDescription: string
// }

const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    console.log('AAA');
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
}

const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
    },
};

export const CourseHeader: FC<CourseDetailHeader> = ({
    title,
    summarizeDescription,
    rating,
    ratingCount,
    promotionalVideo,
    lessons
}) => {

    return (
        <>
            <h3 className="font-semibold text-sm">{title}</h3>
            <p className="text-sm text-gray-300">{summarizeDescription}</p>
            <Rating
                rating={rating}
                ratingCount={ratingCount}
            />
            <video controls className="rounded-xl">
                <source
                    src={promotionalVideo.url}
                    type={`video/${promotionalVideo.format}`}
                >
                </source>
            </video>

            {/* <YouTube videoId={getYoutubeId(l.link!!)} opts={opts} onReady={onPlayerReady} /> */}

            <div className="bg-[#FFFFFF0D] p-3 rounded-lg">
                <h2 className="text-sm font-semibold mb-2">Contenido gratuito</h2>
                <div className="flex space-x-4 overflow-x-auto">
                    {lessons.map((lesson) => (
                        <div key={lesson.id} className="flex-shrink-0 w-60">
                            <Image
                                src={`https://img.youtube.com/vi/${getYoutubeId(lesson.link!!)}/0.jpg`}
                                alt={lesson.title}
                                width={1920}
                                height={1080}
                                className="rounded-lg w-full h-28"
                            />
                            <p className="text-left text-sm mt-2">{lesson.title}</p>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );

};
