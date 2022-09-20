import { DbConnectorService } from "@backend/database/connector/db-connector.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { InvitationCardService } from "../invitation-card.service";
import { InvitationCardGalleryCreateDTO, InvitationCardGalleryUpdateDTO } from "./type";

@Injectable()
export class InvitationCardGalleryService {
  constructor(
    private db: DbConnectorService,
    private cardServie: InvitationCardService
  ) { }

  async create(payload: InvitationCardGalleryCreateDTO) {
    const card = await this.cardServie.getOne(payload.cardId)
    if (!card) {
      throw new BadRequestException('Invitation card not found')
    }
    return this.db.invitationCardGallery.create({
      data: {
        card: {
          connect: {
            id: payload.cardId
          }
        },
        caption: payload.caption,
        image: payload.image
      },
    })
  }

  get(id: string, withLikes?: boolean) {
    return this.db.invitationCardGallery.findFirst({
      where: {
        id,
        deleteAt: null,
      },
      include: {
        card: true,
        likes: withLikes
      }
    })
  }

  async getWithError(id: string, withLikes?: boolean) {
    const data = await this.get(id, withLikes)
    if (!data) throw new GalleryNotFound()
    return data
  }

  getListByCard(idCard: string) {
    return this.db.invitationCardGallery.findMany({
      where: {
        cardId: idCard,
        deleteAt: null
      },
    })
  }

  async update(id: string, payload: InvitationCardGalleryUpdateDTO) {
    await this.getWithError(id)
    return this.db.invitationCardGallery.update({
      where: {
        id,
      },
      data: payload
    })
  }

  delete(id: string) {
    return this.db.invitationCardGallery.update({
      where: { id },
      data: {
        deleteAt: new Date()
      }
    })
  }

  async isOwner(id: string, user: User) {
    const detail = await this.getWithError(id)
    return await this.cardServie.isTheOwnerWithError(detail.card.id, user)
  }

  async toggleLikeAndUpdate(id: string, user: User) {
    await this.getWithError(id)
    await this.toggleLike(id, user)
    return await this.updateLike(id)
  }

  async toggleLike(id: string, user: User) {
    const like = await this.db.invitationCardGalleryLike.findFirst({
      where: {
        user: user,
        galleryId: id
      }
    })
    if (!like) {
      return await this.db.invitationCardGalleryLike.create({
        data: {
          galleryId: id,
          userId: user.id,
        }
      })
    }
    return await this.db.invitationCardGalleryLike.delete({
      where: { id: like.id }
    })
  }

  async updateLike(id: string) {
    const totalLikes = await this.db.invitationCardGalleryLike.count({
      where: {
        galleryId: id
      }
    })
    return await this.db.invitationCardGallery.update({
      where: { id },
      data: {
        totalLikes: totalLikes
      }
    })
  }
}

export class GalleryNotFound extends BadRequestException {
  constructor() {
    super('Gallery not found')
  }
}