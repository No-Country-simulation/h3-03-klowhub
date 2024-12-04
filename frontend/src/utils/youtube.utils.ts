import { YouTubeProps } from 'react-youtube';

const onPlayerReady: YouTubeProps['onReady'] = (event) => {
  event.target.pauseVideo();
}

export const getProps = (videoId: string): YouTubeProps => {
  const youtubeProps = {
    iframeClassName: "aspect-video",
    opts: {
      playerVars: {
        autoplay: 0,
      },
    },
    onReady: onPlayerReady,
    videoId
  };

  return youtubeProps
};
