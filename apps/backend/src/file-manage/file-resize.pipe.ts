import { ArgumentMetadata, BadRequestException, Inject, Injectable, Logger, PipeTransform } from "@nestjs/common";
import { writeFileSync } from "fs";
import { join } from "path";
import sharp from 'sharp'
import { FileManageService, FileProperty } from "./file-manage.service";

export interface FileProcessed {
  filename: string
  location: string
}

async function processImage(image: Express.Multer.File): Promise<FileProperty> {
  const log = new Logger('ProcessImagePipe')
  const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
  log.log(`process image length: ${image?.buffer?.length ?? 0}`)
  // generate random name
  const filename = randomName + ".webp"
  try {
    const imageSharp = sharp(image.buffer)
    const webp = await imageSharp.webp({
      lossless: false,
      effort: 2, // 0 - 6
    }).toBuffer()

    return {
      name: filename,
      file: webp
    }
  } catch (err) {
    log.error(`Failed to process image with error`)
    log.error(err)
    throw new BadRequestException(`Failed to process image`)
  }
}

type InputFileImageProcess = Express.Multer.File | Express.Multer.File[]

async function convertToWebp(value: InputFileImageProcess): Promise<FileProperty | FileProperty[]> {
  if (!Array.isArray(value)) {
    return await processImage(value)
  }
  // if array
  const res = []
  for (let i = 0; i < value.length; i++) {
    const image = value[i];
    res.push(await processImage(image))
  }
  return res;
}

@Injectable()
export class FileImageProcess implements PipeTransform<InputFileImageProcess>{
  @Inject()
  fileManageService: FileManageService

  async transform(value: InputFileImageProcess, metadata: ArgumentMetadata): Promise<FileProcessed | FileProcessed[]> {
    const webp = await convertToWebp(value)
    let uploaded = await this.fileManageService.uploadPublicImages(webp)
    if (Array.isArray(uploaded)) {
      return uploaded.map((v) => ({
        filename: v.filename,
        location: v.location
      }))
    }
  }
}

@Injectable()
export class FileImageProcessMultiple implements PipeTransform<Record<string, InputFileImageProcess>>{
  @Inject()
  fileManageService: FileManageService

  async transform(value: Record<string, InputFileImageProcess>, metadata: ArgumentMetadata): Promise<Record<string, FileProcessed | FileProcessed[]>> {
    const result = {}
    for (let i = 0; i < Object.keys(value).length; i++) {
      const key = Object.keys(value)[i];
      const image = value[key]
      const webp = await convertToWebp(image)
      let uploaded = await this.fileManageService.uploadPublicImages(webp)
      if (Array.isArray(uploaded)) {
        result[key] = uploaded.map((v) => ({
          filename: v.filename,
          location: v.location
        }))
      } else {
        result[key] = uploaded
      }
    }
    return result
  }
}
