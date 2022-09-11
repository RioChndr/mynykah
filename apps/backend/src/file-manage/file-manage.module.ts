import { Global, Module } from "@nestjs/common";
import { FileManageService } from "./file-manage.service";

@Global()
@Module({
  providers: [
    FileManageService
  ],
  exports: [
    FileManageService
  ]
})
export class FileManageModule { }