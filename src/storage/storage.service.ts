import {
    GetObjectCommandOutput,
    PutObjectCommandOutput,
    S3,
  } from '@aws-sdk/client-s3';
  import { Inject } from '@nestjs/common';
  import {
    ImageOptionsType,
    ImagePermission,
    Services,
    SPACES_BUCKET_NAME,
  } from '../util/type';
  import { IStorageService } from './storage';
  
  export class StorageService implements IStorageService {
    constructor(@Inject(Services.S3_CLIENT) private  s3Client: S3) {}
    upload(
      key: string,
      file: Express.Multer.File,
      { isProtected }: ImageOptionsType,
    ): Promise<PutObjectCommandOutput> {
      this.s3Client = new S3({
        forcePathStyle: false, // Configures to use subdomain/virtual calling format.
        endpoint: "https://sgp1.digitaloceanspaces.com",
        region: "sgp1",
        credentials: {
          accessKeyId: "DO00HNJ3R22N3DZ9WW6K",
          secretAccessKey: "z4NkS4TSNUbUG8+w6McQ2JovVPW0Q47b1LQcS9b+V6E"
        }
    });
      return this.s3Client.putObject({
        Bucket: SPACES_BUCKET_NAME,
        Key: `${key}`,
        Body: file.buffer,
        ACL: isProtected ? ImagePermission.PRIVATE : ImagePermission.PUBLIC,
        ContentType: file.mimetype,
      });
    }
  
    getImage(key: string): Promise<GetObjectCommandOutput> {
      return this.s3Client.getObject({
        Bucket: SPACES_BUCKET_NAME,
        Key: key,
      });
    }
  
    getPrivateImage() {}
  }