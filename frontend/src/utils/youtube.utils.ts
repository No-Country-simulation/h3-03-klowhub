import { YouTubeProps } from 'react-youtube';
import { getYoutubeId } from './str.utils';

const onPlayerReady: YouTubeProps['onReady'] = (event) => {
  event.target.pauseVideo();
}

export const getYoutubeProps = (url: string): YouTubeProps => {
  const youtubeProps = {
    iframeClassName: "aspect-video",
    opts: {
      playerVars: {
        autoplay: 0,
      },
    },
    onReady: onPlayerReady,
    videoId: getYoutubeId(url) as string
  };

  return youtubeProps
};
