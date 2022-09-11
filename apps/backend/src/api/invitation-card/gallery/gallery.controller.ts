import { GetUser, NeedAuth } from "@backend/decorators/need-auth.decorator";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { getFileUrlProcessed } from "@backend/file-manage/file-manager.helper";
import { FileImageProcessMultiple, FileProcessed } from "@backend/file-manage/file-resize.pipe";
import { GalleryNotFound, InvitationCardGalleryService } from "./gallery.service";
import { InvitationCardGalleryCreateDTO, InvitationCardGalleryUpdateDTO } from "./type";

@NeedAuth()
@ApiTags('Invitation Card Gallery')
@Controller('invitation-card-gallery')
export class InvitationCardGalleryController {
  constructor(
    private galleryService: InvitationCardGalleryService
  ) { }


  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
  ]))
  create(
    @UploadedFiles(FileImageProcessMultiple) files: {
      image: FileProcessed[],
    },
    @Body() body: InvitationCardGalleryCreateDTO
  ) {
    if (files?.image) {
      body.image = getFileUrlProcessed(files.image)
    }
    return this.galleryService.create(body)
  }

  @Get('list-by-card')
  getGalleryIdCard(
    @Query('idCard') idCard: string
  ) {
    return this.galleryService.getListByCard(idCard)
  }

  @Get('/:id')
  async getDetail(
    @Param('id') id: string
  ) {
    return await this.galleryService.getWithError(id)
  }

  @Put('/:id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
  ]))
  async edit(
    @Param('id') id: string,
    @Body() body: InvitationCardGalleryUpdateDTO,
    @UploadedFiles(FileImageProcessMultiple) files: {
      image: FileProcessed[],
    },
    @GetUser() user: User,
  ) {
    if (files?.image) {
      body.image = getFileUrlProcessed(files.image)
    }
    await this.galleryService.isOwner(id, user)
    return this.galleryService.update(id, body)
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    await this.galleryService.isOwner(id, user)
    return this.galleryService.delete(id)
  }

  @Put('/toggle-like/:id')
  async toggleLike(
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.galleryService.toggleLikeAndUpdate(id, user)
  }
}