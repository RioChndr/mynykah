import { DbConnectorService } from "@backend/database/connector/db-connector.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Prisma, User, InvitationCard } from "@prisma/client";
import { InvitationCardCreateDTO } from "./type";

@Injectable()
export class InvitationCardService {
  constructor(
    private db: DbConnectorService
  ) { }
  create(payload: InvitationCardCreateDTO, user: User) {
    const data: any = {
      user: { connect: { id: user.id } }
    }
    Object.assign(data, payload)
    return this.db.invitationCard.create({
      data: data
    })
  }

  getOne(id: string, include: { galleries?: boolean } = {}) {
    return this.db.invitationCard.findFirst({
      where: {
        id,
        deleteAt: null
      },
      include: {
        galleries: include.galleries
      },
    })
  }

  async getOneWithError(id: string) {
    const data = await this.getOne(id)
    if (!data) throw new InvitationCardNotFound()
    return data
  }

  getListByUser(user: User) {
    return this.db.invitationCard.findMany({
      where: {
        user: {
          id: user.id
        },
        deleteAt: null
      },
    })
  }

  async update(id: string, payloadUpdate: Prisma.InvitationCardUpdateInput) {
    const data = await this.getOneWithError(id)
    Object.assign(data, payloadUpdate)
    return this.db.invitationCard.update({
      where: { id },
      data: data as any,
    })
  }

  async updateThumbnail(id: string, urlThumbnail: string) {
    await this.getOneWithError(id)
    return this.update(id, {
      imageThumbnail: urlThumbnail
    })
  }

  isTheOwner(invCardId: string, user: User) {
    return this.db.invitationCard.findFirst({
      where: {
        id: invCardId,
        user: {
          id: user.id
        },
        deleteAt: null
      }
    })
  }

  async isTheOwnerWithError(invCardId: string, user: User) {
    const isOwned = await this.isTheOwner(invCardId, user)
    if (!isOwned) throw new InvitationCardNotFound()
  }
}

export class InvitationCardNotFound extends BadRequestException {
  constructor() {
    super('Invitation card not found')
  }
}