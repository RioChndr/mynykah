import { BadRequestException, Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { DbConnectorService } from "src/database/connector/db-connector.service";
import { InvitationCardCreateDTO, InvitationCardUpdateDTO } from "./type";

@Injectable()
export class InvitationCardService {
  constructor(
    private db: DbConnectorService
  ) { }
  create(payload: InvitationCardCreateDTO, user: User) {
    const data: Prisma.InvitationCardCreateInput = {
      ...payload,
      user: { connect: { id: user.id } }
    }
    return this.db.invitationCard.create({
      data: data
    })
  }

  getOne(id: string) {
    return this.db.invitationCard.findUnique({
      where: {
        id
      }
    })
  }

  getListByUser(user: User) {
    return this.db.invitationCard.findMany({
      where: {
        user: {
          id: user.id
        }
      },
    })
  }

  async update(id: string, payloadUpdate: InvitationCardUpdateDTO) {
    const data = await this.getOne(id)
    if (!data) throw new BadRequestException(`Invitation card ${id} not found`)
    Object.assign(data, payloadUpdate)
    return this.db.invitationCard.update({
      where: { id },
      data,
    })
  }

  isTheOwner(invCardId: string, user: User) {
    return this.db.invitationCard.findFirst({
      where: {
        id: invCardId,
        user: {
          id: user.id
        }
      }
    })
  }

  async isTheOwnerWithError(invCardId: string, user: User) {
    const isOwned = await this.isTheOwner(invCardId, user)
    if (!isOwned) throw new BadRequestException("Not found")
  }
}