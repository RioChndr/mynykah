import { ArgumentMetadata, BadRequestException, Injectable, Logger, PipeTransform } from "@nestjs/common";
import { writeFileSync } from "fs";
import { join } from "path";
import sharp from 'sharp'

export interface FileProcessed {
  filename: string
  folder: string
  location: string
}

async function processImage(image: Express.Multer.File) {
  const log = new Logger('ProcessImagePipe')
  const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
  log.log(`process image ${image?.filename}, length: ${image?.buffer?.length ?? 0}`)
  // generate random name
  const filename = randomName + ".webp"
  const folder = 'uploads'
  const location = join(folder, filename)
  try {
    const imageSharp = sharp(image.buffer)
    const webp = await imageSharp.webp({
      lossless: false,
      effort: 2, // 0 - 6
    }).toBuffer()
    writeFileSync(location, webp)
    const res = {
      filename,
      folder,
      location
    }
    return res;
  } catch (err) {
    log.error(`Failed to process image with error`)
    log.error(err)
    throw new BadRequestException(`Failed to process image`)
  }
}

type InputFileImageProcess = Express.Multer.File | Express.Multer.File[]

async function processImageArrayOrNot(value: InputFileImageProcess) {
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
  async transform(value: InputFileImageProcess, metadata: ArgumentMetadata): Promise<FileProcessed | FileProcessed[]> {
    return await processImageArrayOrNot(value)
  }
}

@Injectable()
export class FileImageProcessMultiple implements PipeTransform<Record<string, InputFileImageProcess>>{
  async transform(value: Record<string, InputFileImageProcess>, metadata: ArgumentMetadata): Promise<Record<string, FileProcessed | FileProcessed[]>> {
    const result = {}
    for (let i = 0; i < Object.keys(value).length; i++) {
      const key = Object.keys(value)[i];
      const image = value[key]
      result[key] = await processImageArrayOrNot(image)
    }
    return result
  }
}
