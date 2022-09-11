import { Injectable } from "@nestjs/common";
import { PutObjectCommand, S3Client, PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { join } from "path";

export interface FileProperty { file: Buffer, name: string }

@Injectable()
export class FileManageService {
  private s3Client = new S3Client({
    endpoint: 'https://sgp1.digitaloceanspaces.com', // Find your endpoint in the control panel, under Settings. Prepend "https://".
    region: 'sgp1', // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
    credentials: {
      accessKeyId: process.env.DO_SPACES_KEY, // Access key pair. You can create access key pairs using the control panel or API.
      secretAccessKey: process.env.DO_SPACES_KEY_SECRET // Secret access key defined through an environment variable.
    },
  })

  async uploadPublicImages(payloads: FileProperty | FileProperty[]) {
    if (Array.isArray(payloads)) {
      return Promise.all(payloads.map((payload => {
        return this.uploadPublicImage(payload)
      })))
    }
    return await this.uploadPublicImage(payloads)
  }

  async uploadPublicImage(payload: FileProperty) {
    return await this.s3Send({
      file: payload.file,
      filename: payload.name,
      pathFolder: 'user-public',
      privacy: 'public-read'
    })
  }

  async s3Send(payload: {
    pathFolder: string,
    filename: string,
    file: Buffer,
    privacy?: 'private' | 'public-read'
  }) {
    const prefixFolder = process.env.DO_SPACES_PREFIX_FOLDER || 'upload'
    const Key = join(prefixFolder, payload.pathFolder, payload.filename)

    await this.s3Client.send(new PutObjectCommand({
      Bucket: process.env.DO_SPACES_BUCKET,
      Key,
      Body: payload.file,
      ACL: payload.privacy || 'public-read'
    }))

    return {
      filename: payload.filename,
      location: Key
    }
  }
}