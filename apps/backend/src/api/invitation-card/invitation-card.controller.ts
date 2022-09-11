import { Body, Controller, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { GetUser, NeedAuth } from "../../decorators/need-auth.decorator";
import { getFileUrlProcessed } from "../../file-manage/file-manager.helper";
import { FileImageProcessMultiple, FileProcessed } from "../../file-manage/file-resize.pipe";
import { InvitationCardService } from "./invitation-card.service";
import { InvitationCardCreateDTO, InvitationCardUpdateDTO } from "./type";

@ApiTags('Invitation Card')
@Controller('invitation-card')
export class InvitationCardController {
  constructor(
    private invCardService: InvitationCardService
  ) { }

  @NeedAuth()
  @Post('/create')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'imageThumbnail', maxCount: 1 },
  ]))
  create(
    @Body() body: InvitationCardCreateDTO,
    @GetUser() user: User,
    @UploadedFiles(FileImageProcessMultiple) files: {
      imageCouple: FileProcessed[],
      imageThumbnail: FileProcessed[],
    }
  ) {
    if (body.date) body.date = new Date(body.date)
    return this.invCardService.create(body, user)
  }

  @Get('/detail/:id')
  getOne(
    @Param('id') id: string
  ) {
    return this.invCardService.getOne(id)
  }

  @NeedAuth()
  @Get('/list')
  listByUser(
    @GetUser() user: User
  ) {
    return this.invCardService.getListByUser(user)
  }

  @NeedAuth()
  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() body: InvitationCardUpdateDTO
  ) {
    if (body.date) body.date = new Date(body.date)
    await this.invCardService.isTheOwnerWithError(id, user)
    return this.invCardService.update(id, body)
  }

  @NeedAuth()
  @Put('/update-thumbnail/:id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'imageThumbnail', maxCount: 1 },
  ]))
  async updateThumbnail(
    @UploadedFiles(FileImageProcessMultiple) files: {
      imageThumbnail: FileProcessed[],
    },
    @Param('id') id: string
  ) {

    this.invCardService.updateThumbnail(id, getFileUrlProcessed(files.imageThumbnail))
  }
}