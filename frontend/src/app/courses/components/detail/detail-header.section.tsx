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
    promotionalVideo
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
            
            <YouTube videoId={getYoutubeId(l.link!!)} opts={opts} onReady={onPlayerReady} />
            
        </>
    );

};
