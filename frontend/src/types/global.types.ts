import { ImageProps } from "next/image";

export type Language = "english" | "spanish"
export type Platform = "appsheet" | "powerapps"

export type AuthorInfo = {
  name: string;
  about: string;
  profileImg: TImage;
  rating?: number;
  profileLink?: string;
}

export type FileType = {
  [key: string]: string[]
}

export type Dimensions = {
  width: number
  height: number
}

export type TDocumentProps = {
  filename: string
}

export type TImageProps = {
  alt: string
  format: string
} & Dimensions

export type TVideoProps = {
  duration: number
  format: string
  thumbnailHeight: number
  thumbnailWidth: number
  thumbnailUrl: string
} & Dimensions

export type TImage = UploadedFile<TImageProps, "image">
export type TVideo = UploadedFile<TVideoProps, "video">
export type TDocument = UploadedFile<TDocumentProps, "document">

export type UploadedFileCommon = {
  url: string
  mimeType: string
  created_at: Date
  size: number
}

export type UploadedFile<Props, T extends string> = {
  id: string
  fileType: T
  fileMetadata: Props & UploadedFileCommon
}

export type FilePayload = {
  id: string
  fileType: string
  fileMetadata: Omit<TImage, "id"> | Omit<TVideo, "id"> | Omit<TDocument, "id">
}

export type PromotedProduct = {
  type: string | null
  id: string | null
}

export type Promotion = {
  id?: string
  product: PromotedProduct
  percentage: number
}

export type BTPromotion = {
  id: string
  type: string
  percentage: number
}

export type Rating = {
  rating: number
  ratingCount: number
}
export type FlatPromotion = PromotedProduct & { percentage: Promotion["percentage"] }

export type FormAdvice = {
  display: boolean
  header: string
  text: string
} & ImageProps

export type Action<T, P> = {
  type: T
  payload: P
}

export type BTError = {
  statusCode: number
  messages: string | string[]
}
