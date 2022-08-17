import { Controller, Get, Param, Query, StreamableFile } from "@nestjs/common";
import { createReadStream, existsSync } from "fs";
import { join } from "path";

@Controller()
export class FileController {
  @Get('file/:folder/:filename')
  getFile(
    @Param('folder')
    folder: string,
    @Param('filename')
    filename: string,
  ) {
    try {
      const locationFile = join(process.cwd(), folder, filename)
      if (existsSync(locationFile)) {
        const file = createReadStream(locationFile);
        return new StreamableFile(file);
      }
      return null
    } catch (err) {
      return null
    }
  }

}