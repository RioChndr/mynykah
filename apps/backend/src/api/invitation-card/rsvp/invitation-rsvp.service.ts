import { DbConnectorService } from "@backend/database/connector/db-connector.service";
import { PaginationDb, PaginationQuery, PaginationResponse } from "@backend/type/Pagination";
import { Injectable } from "@nestjs/common";
import { User, Prisma, RSVPStatus } from "@prisma/client";
import { InvitationRSVPJoinDTO, InvitationRSVPNotJoinDTO } from "./type";

@Injectable()
export class InvitationrSVPService {
  constructor(
    private db: DbConnectorService
  ) { }

  join(body: InvitationRSVPJoinDTO, user?: User) {
    const rsvp: Prisma.InvitationCardRSVPCreateInput = {
      status: "attended",
      card: {
        connect: {
          id: body.cardId
        }
      },
      name: body.name,
      gift: body.gift,
      person: body.totalPerson || 1,
      user: user && {
        connect: {
          id: user?.id
        }
      }
    }

    return this.db.invitationCardRSVP.create({
      data: rsvp
    })
  }

  notJoin(body: InvitationRSVPNotJoinDTO, user?: User) {
    const rsvp: Prisma.InvitationCardRSVPCreateInput = {
      status: "notAttended",
      card: {
        connect: {
          id: body.cardId
        }
      },
      name: body.name,
      gift: body.gift,
      reason: body.reason,
      user: user && {
        connect: {
          id: user?.id
        }
      }
    }

    return this.db.invitationCardRSVP.create({
      data: rsvp
    })
  }

  total(idCard: string) {
    return this.db.invitationCardRSVP.groupBy({
      by: ["status"],
      where: {
        cardId: idCard
      },
      _count: {
        status: true
      },
      _sum: {
        person: true
      },
    })
  }

  async list(idCard: string, status?: RSVPStatus, pagination?: PaginationQuery) {
    const data = await this.db.invitationCardRSVP.findMany({
      where: {
        cardId: idCard,
        status: status
      },
      orderBy: {
        createdAt: "desc"
      },
      ...PaginationDb(pagination),
    })
    const total = await this.db.invitationCardRSVP.count({
      where: {
        cardId: idCard,
        status: status
      }
    })
    return new PaginationResponse(pagination, data, total)
  }
}