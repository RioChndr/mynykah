import { UserCred } from "@backend/database/repos/user.repository";
import { GetUser, NeedAuth } from "@backend/decorators/need-auth.decorator";
import { PaginationQuery, PaginationQueryPipe } from "@backend/type/Pagination";
import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiProperty, ApiQuery } from "@nestjs/swagger";
import { RSVPStatus, User } from "@prisma/client";
import { InvitationCardService } from "../invitation-card.service";
import { InvitationrSVPService } from "./invitation-rsvp.service";
import { InvitationRSVPJoinDTO, InvitationRSVPNotJoinDTO } from "./type";

@Controller('invitation-rsvp')
export class InviationRSVPController {
  constructor(
    private rsvpService: InvitationrSVPService,
    private cardService: InvitationCardService
  ) { }

  @NeedAuth({ allowPass: true })
  @Post('join')
  join(
    @Body() body: InvitationRSVPJoinDTO,
    @GetUser() user: User
  ) {
    return this.rsvpService.join(body, user);
  }

  @NeedAuth({ allowPass: true })
  @Post('not-join')
  notJoin(
    @Body() body: InvitationRSVPNotJoinDTO,
    @GetUser() user: User
  ) {
    return this.rsvpService.notJoin(body, user);
  }

  @Get(':idcard/total')
  totalJoin(
    @Param('idcard') idCard: string
  ) {
    return this.rsvpService.total(idCard);
  }

  @ApiQuery({
    name: 'status',
    enum: RSVPStatus,
    required: false,
  })
  @NeedAuth({ allowPass: true })
  @Get(':idcard/list')
  async list(
    @Param('idcard') idCard: string,
    @Query('status') status: string,
    @Query(PaginationQueryPipe) pagination: PaginationQuery,
    @GetUser() user: User
  ) {
    await this.cardService.isTheOwnerWithError(idCard, user)
    return this.rsvpService.list(idCard, status as RSVPStatus, pagination);
  }
}