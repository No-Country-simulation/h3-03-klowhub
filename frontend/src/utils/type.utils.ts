import { TImage, TVideo, TDocument } from "@/types/global.types";

export function isImage (file: TImage | TVideo | TDocument): file is TImage {
  return (file as TImage).alt !== undefined
};

export function isVideo (file: TImage | TVideo | TDocument): file is TVideo {
  return (file as TVideo).duration !== undefined
};

export function isDocument (file: TImage | TVideo | TDocument): file is TDocument {
  return (file as TDocument).filename !== undefined
};
