import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const isVideo = file.mimetype.startsWith('video/');
      const isPdf = file.mimetype === 'application/pdf';

      const options = isVideo
        ? { resource_type: 'video' as const }
        : isPdf
          ? { resource_type: 'raw' as const }
          : {
              transformation: [
                {
                  width: 800,
                  height: 800,
                  crop: 'auto',
                  quality: 'auto',
                  fetch_format: 'webp',
                  gravity: 'auto',
                },
              ],
            };
      const uploadStream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) return reject(error);

          if (isVideo) {
            const videoThumbnail = cloudinary.url(result.public_id, {
              resource_type: 'video',
              format: 'jpg',
              width: 400,
              height: 300,
              crop: 'fit',
            });
            result.thumbnailUrl = videoThumbnail;
            result.thumbnailUrl_width = 400;
            result.thumbnailUrl_height = 300;
          }

          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
